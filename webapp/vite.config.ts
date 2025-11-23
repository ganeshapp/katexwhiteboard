import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/katexwhiteboard/', // Set base path for GitHub Pages
  server: {
    port: 3000
  },
  optimizeDeps: {
    exclude: ['@katex-whiteboard/handwriter']
  },
  define: {
    'process.env': {},
    'process.platform': JSON.stringify(''),
    'process.version': JSON.stringify('')
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'excalidraw': ['@excalidraw/excalidraw']
        }
      }
    }
  }
});

