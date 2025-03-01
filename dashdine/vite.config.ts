import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Allow external access
    port: 5173,      // Ensure it's the correct port
    strictPort: true,
    allowedHosts: ["b548-45-124-146-107.ngrok-free.app"], // Add your ngrok URL
  }
})
