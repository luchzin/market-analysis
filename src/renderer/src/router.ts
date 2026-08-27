import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from './pages/HomeView.vue'
import AboutView from './pages/AboutView.vue'
import LoginView from './pages/auth/LoginView.vue'
import SignupView from './pages/auth/SignupView.vue'
import ForgetPassView from './pages/auth/ForgetPassView.vue'
import ResetPasswordView from './pages/auth/ResetPasswordView.vue'
import AppView from './pages/AppView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/about', name: 'about', component: AboutView },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/signup', name: 'signup', component: SignupView },
  { path: '/forget-password', name: 'forget-password', component: ForgetPassView },
  { path: '/reset-password', name: 'reset-password', component: ResetPasswordView },
  { path: '/app', name: 'app', component: AppView }
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes
})
