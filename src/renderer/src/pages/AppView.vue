<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
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
const route = useRoute()

const handleLogout = async () => {
  await supabase.auth.signOut()
  router.push('/')
}

const navSections = [
  {
    label: 'Markets',
    items: [
      { title: 'Overview', name: 'app', icon: LineChart },
      { title: 'Market Movers', name: 'market-movers', icon: TrendingUp },
      { title: 'Screener', name: 'screener', icon: Search }
    ]
  },
  {
    label: 'Workspace',
    items: [
      { title: 'Algorithms', name: 'algorithms', icon: BarChart3 },
      { title: 'Alerts', name: 'alerts', icon: Bell }
    ]
  },
  {
    label: 'Account',
    items: [
      { title: 'Settings', name: 'settings', icon: Settings }
    ]
  }
]

const pageTitle = computed(() => (route.meta.title as string) || 'Stock Overview')
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
        <SidebarGroup v-for="section in navSections" :key="section.label">
          <SidebarGroupLabel class="text-xs text-slate-500 uppercase tracking-wider group-data-[collapsible=icon]:hidden">
            {{ section.label }}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem v-for="item in section.items" :key="item.name">
                <SidebarMenuButton
                  as-child
                  :is-active="route.name === item.name"
                  :tooltip="item.title"
                  class="text-slate-300 hover:text-emerald-400 hover:bg-slate-900 transition-colors data-[active=true]:bg-slate-900 data-[active=true]:text-emerald-400"
                >
                  <RouterLink :to="{ name: item.name }">
                    <component :is="item.icon" />
                    <span>{{ item.title }}</span>
                  </RouterLink>
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
        <h1 class="text-lg font-semibold text-slate-100 ml-4">{{ pageTitle }}</h1>
      </header>

      <main class="flex-1 p-6 overflow-auto text-slate-300">
        <RouterView />
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>
