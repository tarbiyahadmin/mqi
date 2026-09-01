/** Static export requires at least one param for dynamic routes. */
export function withStaticExportFallback<T>(params: T[], fallback: T): T[] {
  return params.length > 0 ? params : [fallback];
}
