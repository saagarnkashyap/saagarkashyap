import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/saagarkashyap/',  // <-- 🔥 add this line: your repo name with slashes
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    include: ['react-tsparticles', 'tsparticles']
  }
})
