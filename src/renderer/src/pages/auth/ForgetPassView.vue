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
const errorMessage = ref('')
const successMessage = ref('')
const isLoading = ref(false)
const router = useRouter()

const handleResetRequest = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  isLoading.value = true

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email.value, {
      redirectTo: `${window.location.origin}/reset-password`
    })

    if (error) {
      errorMessage.value = error.message
      return
    }

    successMessage.value = 'Password reset instructions have been sent to your email.'
  } catch (err) {
    errorMessage.value = 'An unexpected error occurred.'
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
        <CardTitle class="text-2xl">Forgot Password</CardTitle>
        <CardDescription>Enter your email to receive a password reset link</CardDescription>
      </CardHeader>

      <CardContent>
        <form @submit.prevent="handleResetRequest" class="space-y-4">
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

          <Button type="submit" class="w-full" :disabled="isLoading">
            {{ isLoading ? 'Sending...' : 'Send Reset Link' }}
          </Button>

          <!-- Skip Option -->
          <Button type="button" variant="ghost" class="w-full" @click="skipToApp">
            Skip for now →
          </Button>
        </form>

        <p class="mt-4 text-center text-sm text-muted-foreground">
          Remembered your password?
          <router-link to="/login" class="font-medium text-foreground hover:underline"
            >Log in</router-link
          >
        </p>
      </CardContent>
    </Card>
  </div>
</template>
