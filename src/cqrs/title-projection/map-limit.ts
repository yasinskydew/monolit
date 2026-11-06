/** Run async work over items with a fixed concurrency limit. */
export async function mapLimit<T>(
  items: T[],
  concurrency: number,
  worker: (item: T) => Promise<void>,
): Promise<void> {
  if (!items.length) return;
  const limit = Math.max(1, concurrency);
  let next = 0;

  async function run(): Promise<void> {
    while (next < items.length) {
      const index = next;
      next += 1;
      await worker(items[index]);
    }
  }

  const runners = Array.from(
    { length: Math.min(limit, items.length) },
    () => run(),
  );
  await Promise.all(runners);
}
