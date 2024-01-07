export function buildQueryParams(params: Record<string, any>) {
  return Object.entries(params)
    .map(([key, value]) => key && value && `${key}=${value}`)
    .filter((x) => x)
    .join("&");
}
