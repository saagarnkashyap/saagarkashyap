import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/saagarkashyap/',  // <-- 🔥 add this line: your repo name with slashes
  build: {
    // Increase the chunk size warning limit to avoid noisy warnings during CI/CD.
    // Value is in kilobytes. Adjust if necessary (e.g., 2000 = 2 MB).
    chunkSizeWarningLimit: 2000,
  },
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    include: ['react-tsparticles', 'tsparticles']
  }
})
