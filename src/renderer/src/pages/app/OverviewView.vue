<script setup lang="ts">
import { BarChart3, TrendingUp } from 'lucide-vue-next'
</script>

<template>
  <div class="grid gap-6 md:grid-cols-3 mb-6">
    <div class="rounded-xl border border-slate-800 bg-slate-900/50 p-6 shadow-sm">
      <h3 class="text-sm font-medium text-slate-400 mb-2">S&P 500</h3>
      <p class="text-3xl font-bold text-white">5,432.10</p>
      <p class="text-emerald-400 text-sm mt-2 flex items-center">
        <TrendingUp class="h-4 w-4 mr-1" /> +1.24%
      </p>
    </div>
    <div class="rounded-xl border border-slate-800 bg-slate-900/50 p-6 shadow-sm">
      <h3 class="text-sm font-medium text-slate-400 mb-2">NASDAQ</h3>
      <p class="text-3xl font-bold text-white">17,890.35</p>
      <p class="text-emerald-400 text-sm mt-2 flex items-center">
        <TrendingUp class="h-4 w-4 mr-1" /> +1.68%
      </p>
    </div>
    <div class="rounded-xl border border-slate-800 bg-slate-900/50 p-6 shadow-sm">
      <h3 class="text-sm font-medium text-slate-400 mb-2">VIX</h3>
      <p class="text-3xl font-bold text-white">12.45</p>
      <p class="text-rose-400 text-sm mt-2 flex items-center">
        <TrendingUp class="h-4 w-4 mr-1 rotate-180" /> -4.30%
      </p>
    </div>
  </div>

  <div
    class="rounded-xl border border-slate-800 bg-slate-900/50 h-[500px] flex items-center justify-center shadow-sm relative overflow-hidden"
  >
    <div
      class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
    />
    <div class="text-center relative z-10">
      <BarChart3 class="h-16 w-16 mx-auto mb-4 text-emerald-500/50" />
      <h2 class="text-2xl font-semibold text-slate-200 mb-2">Main Chart Area</h2>
      <p class="text-slate-500 max-w-md mx-auto">
        Select an asset from the sidebar or search to load advanced charting and technical indicators.
      </p>
    </div>
  </div>
</template>
