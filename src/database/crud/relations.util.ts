import { RelationsTree } from './crud.types';

/** Flatten `{ a: { b: true } }` → `['a.b']` (MikroORM populate / TypeORM paths). */
export function relationsToPaths(
  tree?: RelationsTree,
  prefix = '',
): string[] {
  if (!tree) return [];
  const paths: string[] = [];
  for (const [key, value] of Object.entries(tree)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value === true) {
      paths.push(path);
    } else {
      paths.push(...relationsToPaths(value, path));
    }
  }
  return paths;
}

/** Nested include object for Prisma / Sequelize / Drizzle `with`. */
export function relationsToInclude(
  tree?: RelationsTree,
): Record<string, true | { include: Record<string, unknown> }> | undefined {
  if (!tree) return undefined;
  const include: Record<string, true | { include: Record<string, unknown> }> =
    {};
  for (const [key, value] of Object.entries(tree)) {
    if (value === true) {
      include[key] = true;
    } else {
      const nested = relationsToInclude(value);
      include[key] = nested ? { include: nested } : true;
    }
  }
  return include;
}

export function relationsToSequelizeInclude(
  tree: RelationsTree | undefined,
  modelByName: Record<string, unknown>,
  associationByPath: (modelName: string, prop: string) => string | undefined,
  currentModel: string,
): object[] | undefined {
  if (!tree) return undefined;
  const include: object[] = [];
  for (const [key, value] of Object.entries(tree)) {
    const assocModelName = associationByPath(currentModel, key);
    const model = assocModelName ? modelByName[assocModelName] : undefined;
    if (!model) continue;
    const nested =
      value === true
        ? undefined
        : relationsToSequelizeInclude(
            value,
            modelByName,
            associationByPath,
            assocModelName!,
          );
    include.push({
      association: key,
      model,
      required: false,
      ...(nested?.length ? { include: nested } : {}),
    });
  }
  return include.length ? include : undefined;
}

export function relationsToDrizzleWith(
  tree?: RelationsTree,
): Record<string, true | { with: Record<string, unknown> }> | undefined {
  if (!tree) return undefined;
  const withClause: Record<string, true | { with: Record<string, unknown> }> =
    {};
  for (const [key, value] of Object.entries(tree)) {
    if (value === true) {
      withClause[key] = true;
    } else {
      const nested = relationsToDrizzleWith(value);
      withClause[key] = nested ? { with: nested } : true;
    }
  }
  return withClause;
}
