import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import PrerenderSPAPlugin from 'vite-plugin-prerender'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    PrerenderSPAPlugin({
      staticDir: path.join(__dirname, 'dist'),
      routes: ['/', '/quiz', '/about', '/privacy', '/terms', '/contact'],
    })
  ],
})

