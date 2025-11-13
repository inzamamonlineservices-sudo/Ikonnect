/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GA_MEASUREMENT_ID: string;
  readonly VITE_FORMSPREE_FORM_ID?: string;
  readonly VITE_GEMINI_API_KEY?: string;
  readonly VITE_USE_STATIC_API?: string;
  readonly VITE_FOOTER_LOGO_CLASS?: string;
  readonly VITE_HEADER_LOGO_CLASS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}