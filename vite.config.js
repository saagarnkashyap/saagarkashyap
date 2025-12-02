import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/',
  build: {
    chunkSizeWarningLimit: 2000,
  },
  plugins: [react(), tailwindcss()],
})
