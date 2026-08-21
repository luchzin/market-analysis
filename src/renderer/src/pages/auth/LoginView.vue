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
const errorMessage = ref('')
const isLoading = ref(false)
const router = useRouter()

const handleLogin = async () => {
  errorMessage.value = ''
  isLoading.value = true
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    })
    if (error) {
      errorMessage.value = error.message
      return
    }

    // Redirect to home dashboard upon successful authentication
    router.push('/')
  } catch (err) {
    errorMessage.value = 'An unexpected error occurred. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div
    class="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4"
  >
    <!-- Background -->
    <img
      :src="wavyLines"
      alt=""
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 h-full w-full object-cover"
    />

    <!-- Login Card -->
    <Card class="relative z-10 w-full max-w-md">
      <CardHeader class="items-center text-center">
        <img src="../assets/logo.png" alt="App Logo" class="mb-2 h-16 w-16 object-contain" />

        <CardTitle class="text-2xl">
          Welcome Back to
          <span class="text-primary">Stock Analysis</span>
        </CardTitle>

        <CardDescription> Please log in to continue </CardDescription>
      </CardHeader>

      <CardContent>
        <form @submit.prevent="handleLogin" class="space-y-5">
          <!-- Error Alert Message -->
          <div
            v-if="errorMessage"
            class="rounded-md bg-destructive/15 p-3 text-sm text-destructive text-center"
          >
            {{ errorMessage }}
          </div>

          <div class="space-y-2">
            <Label for="email">Email</Label>

            <Input
              id="email"
              v-model="email"
              type="email"
              placeholder="developer@vuejs.org"
              autocomplete="email"
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
              autocomplete="current-password"
              required
            />
          </div>

          <Button type="submit" class="w-full" :disabled="isLoading">
            {{ isLoading ? 'Signing in...' : 'Sign In' }}
          </Button>
        </form>

        <p class="mt-6 text-center text-sm text-muted-foreground">
          New here?
          <router-link to="/signup" class="font-medium text-foreground hover:underline">
            Create an account
          </router-link>
        </p>
      </CardContent>
    </Card>
  </div>
</template>
