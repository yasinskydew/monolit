import { ConfigService } from '@nestjs/config';

export type PostgresConnectionConfig = {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  logging: boolean;
};

export function getPostgresConfig(
  config: ConfigService,
): PostgresConnectionConfig {
  return {
    host: config.get<string>('DB_HOST', 'localhost'),
    port: Number(config.get('DB_PORT', 15432)),
    username: config.get<string>('DB_USER', 'db-nest'),
    password: config.get<string>('DB_PASSWORD', 'db-nest'),
    database: config.get<string>('DB_NAME', 'db-nest_db'),
    logging: config.get<string>('DB_LOGGING') === 'true',
  };
}

export function getPostgresUrl(config: ConfigService): string {
  const fromEnv = config.get<string>('DATABASE_URL');
  if (fromEnv) {
    return fromEnv;
  }

  const { host, port, username, password, database } = getPostgresConfig(config);
  return `postgresql://${encodeURIComponent(username)}:${encodeURIComponent(password)}@${host}:${port}/${database}`;
}

/** Read URL for Title projector / CDC rebuild (Postgres replica). Falls back to primary. */
export function getProjectorPostgresUrl(config: ConfigService): string {
  const fromEnv = config.get<string>('PROJECTOR_DATABASE_URL');
  if (fromEnv) {
    return fromEnv;
  }
  return getPostgresUrl(config);
}
