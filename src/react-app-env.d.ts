/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production" | "test";
    readonly PUBLIC_URL: string;
    readonly REACT_APP_GOOGLE_OAUTH: string;
    readonly REACT_APP_BACK_URL: string;
  }
}
