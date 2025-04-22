### Explicando as features do vite.config.js

- **Configuração de alias**: `alias` é usado para definir caminhos de alias para importações. Por exemplo, `@/` pode ser usado para importar arquivos a partir da raiz do projeto.
- **Configuração de extensões**: `extensions` é usado para definir as extensões de arquivos que o Vite deve procurar ao importar módulos.
- **Configuração de plugins**: `plugins` é usado para adicionar plugins ao processo de construção do projeto.
- **Configuração de módulos**: `modules` é usado para definir regras de transformação para módulos.
- **Configuração de estilos**: `css` é usado para definir regras de transformação para estilos.
- **Configuração de scripts**: `scripts` é usado para definir regras de transformação para scripts.
- **Configuração de testes**: `test` é usado para definir regras de transformação para testes.
- **resolve**: `resolve` é usado para definir regras de resolução de caminhos.
- **resolve.alias**: `resolve.alias` é usado para definir caminhos de alias para importações.
- **resolve.extensions**: `resolve.extensions` é usado para definir as extensões de arquivos que o Vite deve procurar ao importar módulos.
- **root**: `root` é usado para definir o diretório raiz do projeto. Deve estar no mesmo nível do arquivo `vite.config
- **build**: `build` é usado para definir as configurações de build do projeto. Arquivos de produção
- **publicDir**: `publicDir` é usado para definir o diretório público do projeto. Onde vai ser colocado os arquivos estáticos
- **base**: `base` é usado para definir o caminho base do projeto. No caso de ser uma aplicação web, o caminho base é o caminho da aplicação.
- **build.outDir**: `build.outDir` é usado para definir o diretório de saída do projeto.
- **server**: `server` é usado para definir as configurações do servidor de desenvolvimento. Para o modo de desenvolvimento, o servidor de desenvolvimento é o servidor de desenvolvimento do Vite.
- **enforce**: `enforce` é usado para definir a ordem de execução das regras.
- **apply**: `apply` é usado para definir o modo de execução das regras.
- **name**: `name` é usado para definir o nome da regra.
- **transformIndexHtml**: `transformIndexHtml` é usado para definir a transformação de arquivos HTML.

```javascript
import { defineConfig } from 'vite';
import { resolve } from 'path'; // seve para resolver o caminho dos arquivos 


export default defineConfig({
  plugins: [{
    enforce: 'pre', // serve para aplicar a regra antes de qualquer outra regra
    apply: 'serve', // serve para aplicar a regra apenas no modo de desenvolvimento
    name: 'vite-plugin-env-override',
    transformIndexHtml(html) {
      return html.replace(/process\.env\.NODE_ENV/g, '"development"')
    }
  }],
  root: './', // serve para definir o diretório raiz do projeto
  build: {
    outDir: '../dist' // serve para definir o diretório de saída do projeto
  },
  publicDir: './public', // serve para definir o diretório público do projeto
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'], // serve para não precisar colocar a extensão do arquivo
    alias: {
      '@scripts': resolve(__dirname, 'src/scripts'), // serve para definir o alias do diretório src/scripts
      '@styles': resolve(__dirname, 'src/styles'), // serve para definir o alias do diretório src/styles
    }
  },
  base: '/', // serve para definir o caminho base do projeto
  server: {
    port: 3000
  }
})
```
