import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from './pages/HomeView.vue'
import AboutView from './pages/AboutView.vue'
import LoginView from './pages/auth/LoginView.vue'
import SignupView from './pages/auth/SignupView.vue'
import ForgetPassView from './pages/auth/ForgetPassView.vue'
import ResetPasswordView from './pages/auth/ResetPasswordView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/about', component: AboutView },
  { path: '/login', component: LoginView },
  { path: '/signup', component: SignupView },
  { path: '/forget-password', component: ForgetPassView },
  { path: '/reset-password', component: ResetPasswordView }
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes
})
