import { defineConfig } from 'vite';
import { resolve } from 'path';  
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
    outDir: '../dist'
  },
  publicDir: './public', 
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'], 
    alias: {
      '@scripts': resolve(__dirname, 'src/scripts'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@styles': resolve(__dirname, 'src/styles'), 
    }
  },
  base: '/', 
  server: {
    port: 5173,
  }
})

