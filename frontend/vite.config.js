import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    cors: true,
    proxy:{
      '/backend': 'http://localhost/backend'
    }
  },
  resolve: {
    alias: {
      '@assets': '/src/assets',
      '@components': '/src/components',
      '@hooks': '/src/hooks',
      '@lib': '/src/lib',
      '@features': '/src/features',
      '@contexts': '/src/contexts',
    },
  },
})
