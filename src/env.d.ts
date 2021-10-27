interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VUE_APP_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}