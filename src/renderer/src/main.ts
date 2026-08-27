import './assets/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { supabase } from './lib/utils'

router.beforeEach(async (to) => {
  const {
    data: { user },
    error
  } = await supabase.auth.getUser()
  const isAuthenticated = !!user && !error
  const authRequiredPaths = ['/app']
  const unauthOnlyPaths = ['/login', '/signup', '/forget-password', '/reset-password']
  if (authRequiredPaths.includes(to.path) && !isAuthenticated) {
    return { name: 'login' }
  }
  if (unauthOnlyPaths.includes(to.path) && isAuthenticated) {
    return { name: 'app' }  
  }

  return true
})

createApp(App).use(router).mount('#app')
