<script lang="ts" setup>
import Button from '../components/ui/button/Button.vue';

const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
</script>

<template>
  <nav>
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/about">Go to About</RouterLink>
    <Button>
      <RouterLink to="/login">Go to Login</RouterLink>
    </Button>
  </nav>
  <!-- <img alt="logo" class="logo" src="./assets/electron.svg" /> -->
  <div class="creator">Powered by electron-vite</div>
  <div class="text">
    <Layout></Layout>
    Build an Electron app with
    <span class="vue">Vue</span>
    and
    <span class="ts">TypeScript</span>
  </div>
  <p class="tip">Please try pressing <code>F12</code> to open the devTool</p>
  <div class="actions">
    <div class="action">
      <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">Documentation</a>
    </div>
    <div class="action">
      <a target="_blank" rel="noreferrer" @click="ipcHandle">Send IPC</a>
    </div>
  </div>
  <div class="flex min-h-screen items-center justify-center">
    <h1 class="text-4xl font-bold text-emerald-400">Stock Analysis</h1>
  </div>
  <Versions></Versions>
</template>
