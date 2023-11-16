namespace NodeJS {
  interface ProcessEnv {
    PORT: 3000;
    MODE: "production" | "development" | "test";
    MONGO_DB: string;
    TMBD_API_KEY: string;
    TMBD_TOKEN: string;

    JWT_SECRET: string;
  }
}
