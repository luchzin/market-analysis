<script setup lang="ts">
import { TrendingUp } from 'lucide-vue-next'

const movers = [
  { symbol: 'NVDA', name: 'NVIDIA Corp.', change: '+3.85%', positive: true },
  { symbol: 'AAPL', name: 'Apple Inc.', change: '+1.42%', positive: true },
  { symbol: 'TSLA', name: 'Tesla, Inc.', change: '-0.95%', positive: false },
  { symbol: 'AMD', name: 'Advanced Micro Devices', change: '+2.11%', positive: true }
]
</script>

<template>
  <div class="space-y-4">
    <p class="text-slate-400">Live gainers and losers across major US exchanges.</p>
    <div class="rounded-xl border border-slate-800 bg-slate-900/50 divide-y divide-slate-800">
      <div
        v-for="item in movers"
        :key="item.symbol"
        class="flex items-center justify-between px-6 py-4"
      >
        <div>
          <p class="font-semibold text-white">{{ item.symbol }}</p>
          <p class="text-sm text-slate-500">{{ item.name }}</p>
        </div>
        <span
          class="flex items-center text-sm font-medium"
          :class="item.positive ? 'text-emerald-400' : 'text-rose-400'"
        >
          <TrendingUp class="h-4 w-4 mr-1" :class="{ 'rotate-180': !item.positive }" />
          {{ item.change }}
        </span>
      </div>
    </div>
  </div>
</template>
