export const DB_PROVIDERS = [
  'typeorm',
  'drizzle',
  'sequelize',
  'prisma',
  'mikroorm',
] as const;

export type DbProvider = (typeof DB_PROVIDERS)[number];

export function resolveDbProvider(
  value = process.env.DB_PROVIDER,
): DbProvider {
  const provider = (value ?? 'typeorm').toLowerCase();
  if ((DB_PROVIDERS as readonly string[]).includes(provider)) {
    return provider as DbProvider;
  }
  return 'typeorm';
}
