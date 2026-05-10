import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import sitemap from 'vite-plugin-sitemap'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    sitemap({
      hostname: 'https://text-tools-c2f.pages.dev',
    }),
  ],
  server: {
    open: true,
    host: 'localhost',
    port: 5173,
  },
})