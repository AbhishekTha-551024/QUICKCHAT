import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: true,
    proxy: {
      '/api': {
        target: 'https://quickchat-backend-3c0d.onrender.com',
        changeOrigin: true,
      },
      '/socket.io': {
        target: 'https://quickchat-backend-3c0d.onrender.com',
        changeOrigin: true,
        ws: true,
      },
    },
  },
})
