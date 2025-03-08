import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  define: {
    global: "window",
  },
  server: {
    proxy: {
      "/socket": {
        target: "http://localhost:8080",
        changeOrigin: true,
        ws: true, // WebSocket 프록시 활성화
      },
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
})
