/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FILE_SERVER_URL: string;
  readonly VITE_MAP_SERVER_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
