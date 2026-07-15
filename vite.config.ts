import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Hosted on Vercel at the domain root → base '/'.
export default defineConfig({
  plugins: [react()],
  base: '/',
})
