<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import wavyLines from '@/assets/wavy-lines.svg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { supabase } from '../lib/utils'

const newPassword = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')
const isLoading = ref(false)
const router = useRouter()

const handlePasswordUpdate = async () => {
  errorMessage.value = ''

  if (newPassword.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match.'
    return
  }

  isLoading.value = true

  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword.value
    })

    if (error) {
      errorMessage.value = error.message
      return
    }

    router.push('/')
  } catch (err) {
    errorMessage.value = 'Failed to update password. Please try again.'
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
        <CardTitle class="text-2xl">Reset Password</CardTitle>
        <CardDescription>Enter your new password below</CardDescription>
      </CardHeader>

      <CardContent>
        <form @submit.prevent="handlePasswordUpdate" class="space-y-4">
          <div
            v-if="errorMessage"
            class="rounded-md bg-destructive/15 p-3 text-sm text-destructive text-center"
          >
            {{ errorMessage }}
          </div>

          <div class="space-y-2">
            <Label for="newPassword">New Password</Label>
            <Input
              id="newPassword"
              v-model="newPassword"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>

          <div class="space-y-2">
            <Label for="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              v-model="confirmPassword"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>

          <Button type="submit" class="w-full" :disabled="isLoading">
            {{ isLoading ? 'Updating...' : 'Update Password' }}
          </Button>

          <!-- Skip Option -->
          <Button type="button" variant="ghost" class="w-full" @click="skipToApp">
            Skip for now →
          </Button>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
