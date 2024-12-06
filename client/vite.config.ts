import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://fin-track-app.onrender.com',
        // target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
