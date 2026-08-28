```vue
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { User } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { supabase } from '@/lib/utils'

import type { InvestorType, RiskTolerance, PreferredMarkets, ProfileRow } from '@/database'

type UserProfile = {
  fullName: string
  displayName: string
  phone: string
  location: string
  website: string
  bio: string
  investorType: InvestorType
  riskTolerance: RiskTolerance
  preferredMarkets: PreferredMarkets
}

const emptyProfile = (): UserProfile => ({
  fullName: '',
  displayName: '',
  phone: '',
  location: '',
  website: '',
  bio: '',
  investorType: 'individual',
  riskTolerance: 'moderate',
  preferredMarkets: 'us-equities'
})

const fieldClass =
  'border-slate-700 bg-slate-950 text-slate-100 placeholder:text-slate-500 focus-visible:border-emerald-500/60 focus-visible:ring-emerald-500/20'

const selectClass = `${fieldClass} h-9 w-full rounded-md border px-3 text-sm outline-none focus-visible:ring-3`

const email = ref('')
const userId = ref<string | null>(null)

const profile = ref<UserProfile>(emptyProfile())

const isLoading = ref(true)
const isSaving = ref(false)

const errorMessage = ref('')
const successMessage = ref('')

/**
 * Convert database profile into frontend profile format.
 */
const applyProfile = (data: ProfileRow) => {
  profile.value = {
    fullName: data.full_name ?? '',
    displayName: data.display_name ?? '',
    phone: data.phone ?? '',
    location: data.location ?? '',
    website: data.website ?? '',
    bio: data.bio ?? '',
    investorType: data.investor_type,
    riskTolerance: data.risk_tolerance,
    preferredMarkets: data.preferred_markets
  }
}

/**
 * Load authenticated user and their profile.
 */
const loadProfile = async () => {
  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    /**
     * Get authenticated user from Supabase Auth.
     */
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser()

    if (userError || !user) {
      errorMessage.value = userError?.message || 'Unable to load your account.'

      return
    }

    /**
     * Store user information.
     */
    userId.value = user.id
    email.value = user.email ?? ''

    /**
     * Get profile from public.profiles.
     *
     * RLS ensures the user can only access
     * their own profile.
     */
    const { data, error: profileError } = await supabase
      .from('profiles')
      .select(
        `
        id,
        full_name,
        display_name,
        phone,
        location,
        website,
        bio,
        investor_type,
        risk_tolerance,
        preferred_markets,
        created_at,
        updated_at
      `
      )
      .eq('id', user.id)
      .single()

    if (profileError) {
      errorMessage.value = profileError.message
      return
    }

    if (data) {
      applyProfile(data)
    }
  } catch {
    errorMessage.value = 'An unexpected error occurred while loading your profile.'
  } finally {
    isLoading.value = false
  }
}

/**
 * Save profile to public.profiles.
 */
const saveProfile = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  isSaving.value = true

  try {
    if (!userId.value) {
      errorMessage.value = 'You must be logged in to update your profile.'

      return
    }

    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: profile.value.fullName.trim(),
        display_name: profile.value.displayName.trim(),
        phone: profile.value.phone.trim(),
        location: profile.value.location.trim(),
        website: profile.value.website.trim(),
        bio: profile.value.bio.trim(),

        investor_type: profile.value.investorType,
        risk_tolerance: profile.value.riskTolerance,
        preferred_markets: profile.value.preferredMarkets
      })
      .eq('id', userId.value)

    if (error) {
      errorMessage.value = error.message
      return
    }

    successMessage.value = 'Profile saved successfully.'
  } catch {
    errorMessage.value = 'An unexpected error occurred. Please try again.'
  } finally {
    isSaving.value = false
  }
}

onMounted(loadProfile)
</script>

<template>
  <div class="mx-auto max-w-3xl space-y-6">
    <!-- Header -->
    <div class="flex items-start gap-4">
      <div
        class="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20"
      >
        <User class="h-6 w-6" />
      </div>

      <div>
        <h2 class="text-xl font-semibold text-slate-100">Account profile</h2>

        <p class="mt-1 text-sm text-slate-400">Manage your personal and investing profile.</p>
      </div>
    </div>

    <!-- Error -->
    <div v-if="errorMessage" class="rounded-md bg-rose-500/15 p-3 text-sm text-rose-400">
      {{ errorMessage }}
    </div>

    <!-- Success -->
    <div v-if="successMessage" class="rounded-md bg-emerald-500/15 p-3 text-sm text-emerald-400">
      {{ successMessage }}
    </div>

    <!-- Profile Form -->
    <form
      class="space-y-6 rounded-xl border border-slate-800 bg-slate-900/50 p-6"
      @submit.prevent="saveProfile"
    >
      <fieldset :disabled="isLoading || isSaving" class="space-y-6 disabled:opacity-70">
        <!-- Personal Information -->
        <div class="grid gap-4 sm:grid-cols-2">
          <!-- Email -->
          <div class="space-y-2 sm:col-span-2">
            <Label for="email" class="text-slate-300"> Email </Label>

            <Input id="email" :model-value="email" type="email" disabled :class="fieldClass" />

            <p class="text-xs text-slate-500">
              Email is managed by your authentication account and cannot be changed here.
            </p>
          </div>

          <!-- Full Name -->
          <div class="space-y-2">
            <Label for="fullName" class="text-slate-300"> Full name </Label>

            <Input
              id="fullName"
              v-model="profile.fullName"
              type="text"
              placeholder="Ada Lovelace"
              :class="fieldClass"
            />
          </div>

          <!-- Display Name -->
          <div class="space-y-2">
            <Label for="displayName" class="text-slate-300"> Display name </Label>

            <Input
              id="displayName"
              v-model="profile.displayName"
              type="text"
              placeholder="ada"
              :class="fieldClass"
            />
          </div>

          <!-- Phone -->
          <div class="space-y-2">
            <Label for="phone" class="text-slate-300"> Phone </Label>

            <Input
              id="phone"
              v-model="profile.phone"
              type="tel"
              placeholder="+1 555 0100"
              :class="fieldClass"
            />
          </div>

          <!-- Location -->
          <div class="space-y-2">
            <Label for="location" class="text-slate-300"> Location </Label>

            <Input
              id="location"
              v-model="profile.location"
              type="text"
              placeholder="New York, NY"
              :class="fieldClass"
            />
          </div>

          <!-- Website -->
          <div class="space-y-2 sm:col-span-2">
            <Label for="website" class="text-slate-300"> Website </Label>

            <Input
              id="website"
              v-model="profile.website"
              type="url"
              placeholder="https://example.com"
              :class="fieldClass"
            />
          </div>

          <!-- Bio -->
          <div class="space-y-2 sm:col-span-2">
            <Label for="bio" class="text-slate-300"> Bio </Label>

            <textarea
              id="bio"
              v-model="profile.bio"
              rows="4"
              placeholder="A short note about how you use this workspace."
              :class="`${fieldClass} min-h-24 w-full rounded-md px-3 py-2 text-sm`"
            />
          </div>
        </div>

        <!-- Investment Preferences -->
        <div class="grid gap-4 sm:grid-cols-3">
          <!-- Investor Type -->
          <div class="space-y-2">
            <Label for="investorType" class="text-slate-300"> Investor type </Label>

            <select id="investorType" v-model="profile.investorType" :class="selectClass">
              <option value="individual">Individual</option>

              <option value="professional">Professional</option>

              <option value="institution">Institution</option>

              <option value="student">Student</option>
            </select>
          </div>

          <!-- Risk Tolerance -->
          <div class="space-y-2">
            <Label for="riskTolerance" class="text-slate-300"> Risk tolerance </Label>

            <select id="riskTolerance" v-model="profile.riskTolerance" :class="selectClass">
              <option value="conservative">Conservative</option>

              <option value="moderate">Moderate</option>

              <option value="aggressive">Aggressive</option>
            </select>
          </div>

          <!-- Preferred Markets -->
          <div class="space-y-2">
            <Label for="preferredMarkets" class="text-slate-300"> Preferred markets </Label>

            <select id="preferredMarkets" v-model="profile.preferredMarkets" :class="selectClass">
              <option value="us-equities">US equities</option>

              <option value="international">International</option>

              <option value="crypto">Crypto</option>

              <option value="mixed">Mixed</option>
            </select>
          </div>
        </div>
      </fieldset>

      <!-- Save -->
      <div class="flex justify-end">
        <Button
          type="submit"
          :disabled="isLoading || isSaving"
          class="bg-emerald-500 font-semibold text-slate-950 hover:bg-emerald-400"
        >
          {{ isSaving ? 'Saving...' : 'Save profile' }}
        </Button>
      </div>
    </form>
  </div>
</template>
```
