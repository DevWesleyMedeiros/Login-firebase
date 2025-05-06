/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_API_KEY: string;
  // adicione outras variáveis aqui se quiser
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
