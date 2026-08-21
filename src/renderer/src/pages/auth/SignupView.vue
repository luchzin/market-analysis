<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import wavyLines from '@/assets/wavy-lines.svg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { supabase } from '../../lib/utils'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')
const successMessage = ref('')
const isLoading = ref(false)
const router = useRouter()

const handleSignUp = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match.'
    return
  }

  isLoading.value = true

  try {
    const { error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value
    })

    if (error) {
      errorMessage.value = error.message
      return
    }

    successMessage.value = 'Account created! Please check your email to verify.'
  } catch (err) {
    errorMessage.value = 'An unexpected error occurred. Please try again.'
  } finally {
    isLoading.value = false
  }
}

const skipToApp = () => {
  router.push('/')
}
</script>

<template>
  <div
    class="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4"
  >
    <img
      :src="wavyLines"
      alt=""
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 h-full w-full object-cover"
    />

    <Card class="relative z-10 w-full max-w-md">
      <CardHeader class="items-center text-center">
        <img src="../assets/logo.png" alt="App Logo" class="mb-2 h-16 w-16 object-contain" />
        <CardTitle class="text-2xl">Create Account</CardTitle>
        <CardDescription>Get started with Stock Analysis</CardDescription>
      </CardHeader>

      <CardContent>
        <form @submit.prevent="handleSignUp" class="space-y-4">
          <div
            v-if="errorMessage"
            class="rounded-md bg-destructive/15 p-3 text-sm text-destructive text-center"
          >
            {{ errorMessage }}
          </div>
          <div
            v-if="successMessage"
            class="rounded-md bg-emerald-500/15 p-3 text-sm text-emerald-500 text-center"
          >
            {{ successMessage }}
          </div>

          <div class="space-y-2">
            <Label for="email">Email</Label>
            <Input
              id="email"
              v-model="email"
              type="email"
              placeholder="developer@vuejs.org"
              required
            />
          </div>

          <div class="space-y-2">
            <Label for="password">Password</Label>
            <Input
              id="password"
              v-model="password"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>

          <div class="space-y-2">
            <Label for="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              v-model="confirmPassword"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>

          <Button type="submit" class="w-full" :disabled="isLoading">
            {{ isLoading ? 'Creating Account...' : 'Sign Up' }}
          </Button>

          <!-- Skip Option -->
          <Button type="button" variant="ghost" class="w-full" @click="skipToApp">
            Skip for now →
          </Button>
        </form>

        <p class="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?
          <router-link to="/login" class="font-medium text-foreground hover:underline"
            >Log in</router-link
          >
        </p>
      </CardContent>
    </Card>
  </div>
</template>
