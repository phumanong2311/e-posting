import { ROLE } from '../types/enums/role'

export function buildQueryParams(params: Record<string, any>) {
  return Object.entries(params)
    .map(([key, value]) => key && value && `${key}=${value}`)
    .filter((x) => x)
    .join('&')
}

export function getRoleName(role: string) {
  switch (role) {
    case ROLE.ADMIN:
      return 'admin or editor'
    case ROLE.EDITOR:
      return 'admin or editor'
    case ROLE.USER:
      return 'read'
    default:
      return 'read'
  }
}

export function getUserCountry() {
  // Get the user's locale
  const userLocale = navigator.language

  // Use Intl.DateTimeFormat to get country information
  const intl = new Intl.DateTimeFormat(userLocale, {
    timeZoneName: 'shortGeneric',
  })
  const countryTime =
    intl?.formatToParts()?.find((part: any) => part.type === 'timeZoneName')
      ?.value || 'Unknown'

  const country = countryTime.replace('Time', '').trim()
  return country
}

export function isHTML(str) {
  const htmlRegex = /<[a-z][\s\S]*>/i
  return htmlRegex.test(str)
}
