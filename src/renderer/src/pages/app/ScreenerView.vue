<script setup lang="ts">
import { Search } from 'lucide-vue-next'
</script>

<template>
  <div class="rounded-xl border border-slate-800 bg-slate-900/50 p-10 text-center">
    <Search class="h-12 w-12 mx-auto mb-4 text-emerald-500/50" />
    <h2 class="text-xl font-semibold text-slate-200 mb-2">Stock Screener</h2>
    <p class="text-slate-500 max-w-md mx-auto">
      Filter equities by market cap, volume, valuation, and technical signals.
    </p>
  </div>
</template>
