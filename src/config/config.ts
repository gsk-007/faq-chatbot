try { process.loadEnvFile(); } catch {}

function envOrThrow(key: string): string {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Environment variable "${key}" is not set.`);
  }

  return value;
}

type Config = {
  api: {
    port: number;
    platform: string;
  };

  db: {
    url: string;
  };

  openai: {
    apiKey: string;
    model: string;
  };
};

export const config: Config = {
  api: {
    port: Number(envOrThrow("PORT")),
    platform: envOrThrow("node_env"),
  },

  db: {
    url: envOrThrow("DB_URL"),
  },

  openai: {
    apiKey: envOrThrow("OPENAI_API_KEY"),
    model: envOrThrow("OPENAI_MODEL"),
  },
};