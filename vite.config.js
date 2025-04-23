import { defineConfig } from 'vite';
import {
  resolve
} from 'path';

export default defineConfig({
  plugins: [{
    enforce: 'pre',
    apply: 'serve',
    name: 'vite-plugin-env-override',
    transformIndexHtml(html) {
      return html.replace(/process\.env\.NODE_ENV/g, '"development"')
    }
  }],
  root: './', 
  build: {
    outDir: './dist'
    },
    rollupOptions: {
        input: {
          main: resolve(__dirname, "./"),
        },
        output: {
          assetFileNames: ({
            name
          }) => {
            if (/\.(gif|jpe?g|png|svg|ico|webp|avif)$/.test(name || "")) {
              return "images/[name]-[hash][extname]";
            }
            if (/\.(css)$/.test(name || "")) {
              return "styles/[name]-[hash][extname]";
            }
            if (/\.(ttf|otf|woff|woff2)$/.test(name || "")) {
              return "fonts/[name]-[hash][extname]";
            }
            return "assets/[name]-[hash][extname]";
          },
          chunkFileNames: "chunks/[name]-[hash].js",
          entryFileNames: "scripts/[name]-[hash].js",
        },
  },
  publicDir: './public', 
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx', 'png', 'jpeg'],
    alias: {
      '@scripts': resolve(__dirname, 'src/scripts'),
      '@services': resolve(__dirname, 'src/services'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@styles': resolve(__dirname, 'src/styles'), 
      '@images': resolve(__dirname, 'src/images'),
    }
  },
  base: '/', 
  server: {
    port: 5173,
  },
  preview: {
      port: 4173,
  }
})

