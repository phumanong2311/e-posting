import { ROLE } from "../types/enums/role";

export function buildQueryParams(params: Record<string, any>) {
  return Object.entries(params)
    .map(([key, value]) => key && value && `${key}=${value}`)
    .filter((x) => x)
    .join("&");
}

export function getRoleName(role: string) {
  switch (role) {
    case ROLE.ADMIN:
      return "admin or editor";
    case ROLE.EDITOR:
      return "admin or editor";
    case ROLE.USER:
      return "read";
    default:
      return "read";
  }
}
