<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

const handleLogin = () => {
  // Add authentication logic here if needed
  router.push('/')
}
</script>

<template>
  <div class="login-card">
    <img src="../assets/logo.png" alt="App Logo" class="logo" />
    <h1 class="text">Welcome Back to <span class="vue">Vue</span></h1>
    <p class="creator">Please log in to continue</p>

    <form @submit.prevent="handleLogin" class="form">
      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" v-model="email" type="email" placeholder="developer@vuejs.org" required />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input id="password" v-model="password" type="password" placeholder="••••••••" required />
      </div>

      <div class="actions">
        <div class="action">
          <button type="submit">Sign In</button>
        </div>
      </div>
    </form>

    <p class="tip">New here? Run <code>npm create vue@latest</code> to get started.</p>

    <ul class="versions">
      <li>Vue 3</li>
      <li>Vite</li>
      <li>Auth Engine</li>
    </ul>
  </div>
</template>

<style scoped>
/* Card Container */
.login-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 420px;
  padding: 40px 30px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
}

/* Scaled Up Logo */
.logo {
  height: 64px;
  width: 64px;
  margin-bottom: 8px;
  object-fit: contain;
}

.text {
  padding: 8px 0;
  margin: 0;
}

/* Form Layout */
.form {
  width: 100%;
  margin-top: 10px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 18px;
  text-align: left;
}

.form-group label {
  font-size: 14px;
  font-weight: 600;
  color: var(--ev-c-text-2, #8e8e93);
  margin-bottom: 6px;
}

/* Input Fields */
.form-group input {
  width: 100%;
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid var(--ev-c-gray-1, rgba(255, 255, 255, 0.15));
  background-color: var(--color-background-mute, rgba(0, 0, 0, 0.2));
  color: var(--ev-c-text-1, #ffffff);
  font-size: 14px;
  outline: none;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.form-group input:focus {
  border-color: #647eff;
  box-shadow: 0 0 0 3px rgba(100, 126, 255, 0.25);
}

/* Form Actions Button */
.actions {
  justify-content: center;
  padding-top: 12px;
}

.action {
  width: 100%;
}

.action button {
  width: 100%;
  cursor: pointer;
  border: 1px solid var(--ev-button-alt-border, transparent);
  text-align: center;
  font-weight: 600;
  white-space: nowrap;
  border-radius: 20px;
  padding: 0 20px;
  line-height: 42px;
  font-size: 14px;
  color: var(--ev-button-alt-text, #ffffff);
  background-color: var(--ev-button-alt-bg, #647eff);
  transition:
    background-color 0.2s,
    border-color 0.2s,
    color 0.2s;
}

.action button:hover {
  border-color: var(--ev-button-alt-hover-border, transparent);
  color: var(--ev-button-alt-hover-text, #ffffff);
  background-color: var(--ev-button-alt-hover-bg, #42d392);
}

.tip {
  margin-top: 24px;
  font-size: 13px;
}

/* Responsive Overrides */
@media (max-width: 480px) {
  .login-card {
    padding: 24px 16px;
    margin: 0 16px;
  }
}
</style>
