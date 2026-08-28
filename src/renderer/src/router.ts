import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from './pages/HomeView.vue'
import AboutView from './pages/AboutView.vue'
import LoginView from './pages/auth/LoginView.vue'
import SignupView from './pages/auth/SignupView.vue'
import ForgetPassView from './pages/auth/ForgetPassView.vue'
import ResetPasswordView from './pages/auth/ResetPasswordView.vue'
import AppView from './pages/AppView.vue'
import OverviewView from './pages/app/OverviewView.vue'
import MarketMoversView from './pages/app/MarketMoversView.vue'
import ScreenerView from './pages/app/ScreenerView.vue'
import AlgorithmsView from './pages/app/AlgorithmsView.vue'
import AlertsView from './pages/app/AlertsView.vue'
import SettingsView from './pages/app/SettingsView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/about', name: 'about', component: AboutView },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/signup', name: 'signup', component: SignupView },
  { path: '/forget-password', name: 'forget-password', component: ForgetPassView },
  { path: '/reset-password', name: 'reset-password', component: ResetPasswordView },
  {
    path: '/app',
    component: AppView,
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'app', component: OverviewView, meta: { title: 'Stock Overview' } },
      { path: 'market-movers', name: 'market-movers', component: MarketMoversView, meta: { title: 'Market Movers' } },
      { path: 'screener', name: 'screener', component: ScreenerView, meta: { title: 'Screener' } },
      { path: 'algorithms', name: 'algorithms', component: AlgorithmsView, meta: { title: 'Algorithms' } },
      { path: 'alerts', name: 'alerts', component: AlertsView, meta: { title: 'Alerts' } },
      { path: 'settings', name: 'settings', component: SettingsView, meta: { title: 'Settings' } }
    ]
  }
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes
})
