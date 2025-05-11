import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': resolve(__dirname, 'src/Components'),
      '@services': resolve(__dirname, 'src/Services'),
      '@styles': resolve(__dirname, 'src/Styles'),
      '@assets': resolve(__dirname, 'src/Assets'),
      '@utils': resolve(__dirname, 'src/Utils'),
      '@pages': resolve(__dirname, 'src/Pages'),
      '@routes': resolve(__dirname, 'src/Routes'),
      '@contexts': resolve(__dirname, 'src/Contexts'),
      '@hooks': resolve(__dirname, 'src/Hooks'),
      '@images': resolve(__dirname, 'src/Images'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/__/auth': {
        target: 'https://cadastro-usuarios-9c21e.firebaseapp.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/__\/auth/, '/__/auth'),
      },
    },
  },
});
