import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Proxy all /auth, /api, /profile, /payment requests to the backend
      '/auth': { target: 'http://localhost:3001', changeOrigin: true, secure: false },
      '/api': { target: 'http://localhost:3001', changeOrigin: true, secure: false },
      '/profile': { target: 'http://localhost:3001', changeOrigin: true, secure: false },
      '/payment': { target: 'http://localhost:3001', changeOrigin: true, secure: false },
    }
  }
})

