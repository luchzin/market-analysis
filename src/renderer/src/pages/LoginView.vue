<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import wavyLines from '@/assets/wavy-lines.svg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const email = ref('')
const password = ref('')
const router = useRouter()

const handleLogin = () => {
  // Add authentication logic here
  router.push('/')
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

          <Button type="submit" class="w-full"> Sign In </Button>
        </form>

        <p class="mt-6 text-center text-sm text-muted-foreground">
          New here?
          <span class="font-medium text-foreground"> Create an account </span>
        </p>
      </CardContent>
    </Card>
  </div>
</template>
