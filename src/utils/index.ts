export function buildQueryParams(params: Record<string, any>) {
  console.log(params);
  return Object.entries(params)
    .map(([key, value]) => key && value && `${key}=${value}`)
    .filter((x) => x)
    .join("&");
}
