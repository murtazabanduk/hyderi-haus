import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Respect the port assigned by the preview harness (PORT env var).
    port: process.env.PORT ? Number(process.env.PORT) : 5173,
  },
})
