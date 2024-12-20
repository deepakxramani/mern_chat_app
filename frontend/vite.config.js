import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: true,
    cache: false,
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Replace with your backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
