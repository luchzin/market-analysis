<script setup lang="ts">
import { useRouter } from 'vue-router'
import { supabase } from '../lib/utils'
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger
} from '../components/ui/sidebar'
import { LineChart, BarChart3, TrendingUp, Search, Bell, Settings, LogOut } from 'lucide-vue-next'

const router = useRouter()

const handleLogout = async () => {
  await supabase.auth.signOut()
  router.push('/')
}

const menuItems = [
  { title: 'Overview', icon: LineChart },
  { title: 'Market Movers', icon: TrendingUp },
  { title: 'Screener', icon: Search },
  { title: 'Algorithms', icon: BarChart3 },
  { title: 'Alerts', icon: Bell },
  { title: 'Settings', icon: Settings },
]
</script>

<template>
  <SidebarProvider>
    <Sidebar variant="sidebar" collapsible="icon" class="border-r border-slate-800 bg-slate-950 text-slate-300">
      <SidebarHeader class="border-b border-slate-800 p-4">
        <div class="flex items-center gap-3">
          <div class="flex h-8 w-8 items-center justify-center rounded bg-emerald-500/20 text-emerald-400">
            <LineChart class="h-5 w-5" />
          </div>
          <span class="font-bold text-slate-100 group-data-[collapsible=icon]:hidden">StockVision</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent class="py-4">
        <SidebarGroup>
          <SidebarGroupLabel class="text-xs text-slate-500 uppercase tracking-wider group-data-[collapsible=icon]:hidden">
            Analysis Tools
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem v-for="item in menuItems" :key="item.title">
                <SidebarMenuButton class="text-slate-300 hover:text-emerald-400 hover:bg-slate-900 transition-colors">
                  <component :is="item.icon" />
                  <span>{{ item.title }}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter class="border-t border-slate-800 p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton @click="handleLogout" class="text-rose-400 hover:text-rose-300 hover:bg-rose-950/50">
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>

    <SidebarInset class="flex flex-col flex-1 bg-slate-950">
      <header class="flex h-16 shrink-0 items-center gap-2 border-b border-slate-800 px-6">
        <SidebarTrigger class="text-slate-400 hover:text-slate-100" />
        <h1 class="text-lg font-semibold text-slate-100 ml-4">Stock Overview</h1>
      </header>
      
      <main class="flex-1 p-6 overflow-auto text-slate-300">
        <div class="grid gap-6 md:grid-cols-3 mb-6">
          <div class="rounded-xl border border-slate-800 bg-slate-900/50 p-6 shadow-sm">
            <h3 class="text-sm font-medium text-slate-400 mb-2">S&P 500</h3>
            <p class="text-3xl font-bold text-white">5,432.10</p>
            <p class="text-emerald-400 text-sm mt-2 flex items-center"><TrendingUp class="h-4 w-4 mr-1"/> +1.24%</p>
          </div>
          <div class="rounded-xl border border-slate-800 bg-slate-900/50 p-6 shadow-sm">
            <h3 class="text-sm font-medium text-slate-400 mb-2">NASDAQ</h3>
            <p class="text-3xl font-bold text-white">17,890.35</p>
            <p class="text-emerald-400 text-sm mt-2 flex items-center"><TrendingUp class="h-4 w-4 mr-1"/> +1.68%</p>
          </div>
          <div class="rounded-xl border border-slate-800 bg-slate-900/50 p-6 shadow-sm">
            <h3 class="text-sm font-medium text-slate-400 mb-2">VIX</h3>
            <p class="text-3xl font-bold text-white">12.45</p>
            <p class="text-rose-400 text-sm mt-2 flex items-center"><TrendingUp class="h-4 w-4 mr-1 transform rotate-180"/> -4.30%</p>
          </div>
        </div>
        
        <div class="rounded-xl border border-slate-800 bg-slate-900/50 h-[500px] flex items-center justify-center shadow-sm relative overflow-hidden">
          <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div class="text-center relative z-10">
            <BarChart3 class="h-16 w-16 mx-auto mb-4 text-emerald-500/50" />
            <h2 class="text-2xl font-semibold text-slate-200 mb-2">Main Chart Area</h2>
            <p class="text-slate-500 max-w-md mx-auto">Select an asset from the sidebar or search to load advanced charting and technical indicators.</p>
          </div>
        </div>
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>
