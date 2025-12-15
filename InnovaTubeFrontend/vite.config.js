import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // expone el servidor a todas las IPs
    port: 5173,
    strictPort: true,
    allowedHosts: [
      'galina-tauromachian-stacia.ngrok-free.dev' // <-- agrega aquí tu host de ngrok
    ]
  }
})
