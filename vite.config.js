import { defineConfig } from 'vite';
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  root: './',
  plugins: [
    {
      enforce: 'pre',
      apply: 'serve',
      name: 'vite-plugin-env-override',
      transformIndexHtml(html) {
        return html.replace(/process\.env\.NODE_ENV/g, '"development"');
      },
    },
    tailwindcss(),
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        signup: resolve(__dirname, 'src/pages/signup.html'),
        home: resolve(__dirname, 'src/pages/home.html'),
      },
    },
  },
  publicDir: './public',
  resolve: {
    alias: {
      '@scripts': resolve(__dirname, 'src/scripts'),
      '@services': resolve(__dirname, 'src/services'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@styles': resolve(__dirname, 'src/styles'),
      '@images': resolve(__dirname, 'src/images'),
    },
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx', '.png', '.jpeg'],
  },
  base: '/',
  server: {
    port: 5173,
    proxy: {
      '/__/auth': {
        target: 'https://cadastro-usuarios-9c21e.firebaseapp.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/__\/auth/, '/__/auth'),
      },
    },
  },
  preview: {
    port: 5173,
  },
});
