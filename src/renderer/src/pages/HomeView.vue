<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { supabase } from '../lib/utils'
import {
  TrendingUp,
  BarChart3,
  ShieldCheck,
  Zap,
  LineChart,
  ArrowRight,
  Sparkles,
  ChevronRight
} from 'lucide-vue-next'

import Button from '../components/ui/button/Button.vue'
import Card from '../components/ui/card/Card.vue'
import CardHeader from '../components/ui/card/CardHeader.vue'
import CardTitle from '../components/ui/card/CardTitle.vue'
import CardDescription from '../components/ui/card/CardDescription.vue'
import CardContent from '../components/ui/card/CardContent.vue'
import Badge from '../components/ui/badge/Badge.vue'

const isAuthenticated = ref(false)

onMounted(() => {
  supabase.auth.getSession().then(({ data: { session } }) => {
    isAuthenticated.value = !!session
  })

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    isAuthenticated.value = !!session
  })

  onUnmounted(() => {
    subscription.unsubscribe()
  })
})

const marketStats = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: '$189.84', change: '+1.42%', positive: true },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: '$120.89', change: '+3.85%', positive: true },
  { symbol: 'TSLA', name: 'Tesla, Inc.', price: '$248.23', change: '-0.95%', positive: false },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: '$447.67', change: '+0.78%', positive: true }
]

const features = [
  {
    icon: TrendingUp,
    title: 'Real-Time Market Tracking',
    description: 'Sub-millisecond latency data feeds directly from global exchanges with automated dynamic scaling.'
  },
  {
    icon: BarChart3,
    title: 'AI Signal Recognition',
    description: 'Advanced pattern recognition models pinpoint breakout opportunities before the crowd moves.'
  },
  {
    icon: Zap,
    title: 'Instant IPC Execution',
    description: 'Direct desktop engine hooks give you sub-5ms order execution without browser throttling.'
  },
  {
    icon: ShieldCheck,
    title: 'Institutional Risk Engine',
    description: 'Stress-test portfolios against historical crash vectors and dynamic market volatility metrics.'
  }
]
</script>

<template>
  <div class="min-h-screen bg-slate-950 text-slate-50 antialiased selection:bg-emerald-500 selection:text-slate-950">
    <!-- Ambient Gradient Background -->
    <div class="pointer-events-none fixed inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 h-125 w-125 rounded-full bg-emerald-500/10 blur-[120px]" />
      <div class="absolute top-1/2 -left-40 h-125 w-125 rounded-full bg-cyan-500/10 blur-[120px]" />
    </div>

    <!-- Navigation -->
    <header class="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md">
      <div class="container mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div class="flex items-center gap-2">
          <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20">
            <LineChart class="h-5 w-5" />
          </div>
          <span class="text-lg font-bold tracking-tight text-white">StockVision<span class="text-emerald-400">.ai</span></span>
        </div>

        <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <RouterLink to="/" class="transition-colors hover:text-white">Dashboard</RouterLink>
          <RouterLink to="/about" class="transition-colors hover:text-white">Analytics</RouterLink>
          <a href="https://electron-vite.org/" target="_blank" rel="noreferrer" class="transition-colors hover:text-white">Docs</a>
        </nav>

        <div class="flex items-center gap-3">
          <Button v-if="!isAuthenticated" size="sm" class="bg-emerald-500 font-semibold text-slate-950 hover:bg-emerald-400 shadow-lg shadow-emerald-500/20">
            <RouterLink to="/login" class="flex items-center gap-1.5">
              Login
            </RouterLink>
          </Button>
          <Button v-else size="sm" class="bg-emerald-500 font-semibold text-slate-950 hover:bg-emerald-400 shadow-lg shadow-emerald-500/20">
            <RouterLink to="/app" class="flex items-center gap-1.5">
              Launch App <ChevronRight class="h-4 w-4" />
            </RouterLink>
          </Button>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="relative pt-20 pb-16 md:pt-32 md:pb-24">
      <div class="container mx-auto max-w-7xl px-6 text-center">
        <Badge variant="outline" class="mb-6 inline-flex items-center gap-2 border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
          <Sparkles class="h-3.5 w-3.5" />
          Powered by Electron & Vue 3
        </Badge>

        <h1 class="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
          Precision Trading Tools for <span class="bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Smart Investors</span>
        </h1>

        <p class="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
          Analyze market movement, run real-time algorithmic backtests, and manage exposure with our next-generation desktop workspace.
        </p>

        <div class="mt-8 flex items-center justify-center gap-4">
          <Button size="lg" class="bg-emerald-500 font-semibold text-slate-950 hover:bg-emerald-400 shadow-xl shadow-emerald-500/20">
            Get Started <ArrowRight class="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg" class="border-slate-800 text-slate-300 hover:bg-slate-900 hover:text-white">
            View Live Demo
          </Button>
        </div>

        <!-- Ticker Strip -->
        <div class="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6 max-w-5xl mx-auto">
          <Card v-for="item in marketStats" :key="item.symbol" class="border-slate-800/80 bg-slate-900/50 backdrop-blur-sm">
            <CardContent class="p-4 flex flex-col items-start justify-between">
              <div class="flex w-full items-center justify-between text-xs text-slate-400">
                <span class="font-bold text-white">{{ item.symbol }}</span>
                <span>{{ item.name }}</span>
              </div>
              <div class="mt-3 flex w-full items-baseline justify-between">
                <span class="text-lg font-semibold text-white">{{ item.price }}</span>
                <span class="text-xs font-semibold" :class="item.positive ? 'text-emerald-400' : 'text-rose-400'">
                  {{ item.change }}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <!-- Features Grid -->
    <section class="border-t border-slate-800/60 bg-slate-900/30 py-20">
      <div class="container mx-auto max-w-7xl px-6">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Engineered for High-Frequency Insights
          </h2>
          <p class="mt-4 text-slate-400">
            Everything you need to analyze market trends and act before volatility spikes.
          </p>
        </div>

        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card v-for="feat in features" :key="feat.title" class="border-slate-800 bg-slate-900/50 backdrop-blur-sm transition-all hover:border-slate-700 hover:bg-slate-900">
            <CardHeader>
              <div class="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20">
                <component :is="feat.icon" class="h-5 w-5" />
              </div>
              <CardTitle class="text-lg text-white">{{ feat.title }}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription class="text-slate-400 text-sm leading-relaxed">
                {{ feat.description }}
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <!-- Dev Environment Banner -->
    <footer class="border-t border-slate-800/80 bg-slate-950 py-8 text-xs text-slate-500">
      <div class="container mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <span>Powered by electron-vite</span>
          <span>•</span>
          <span>Press <kbd class="rounded bg-slate-800 px-1.5 py-0.5 text-slate-300 font-mono">F12</kbd> for DevTools</span>
        </div>
        <Versions />
      </div>
    </footer>
  </div>
</template>