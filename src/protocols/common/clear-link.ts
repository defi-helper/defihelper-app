/* eslint-disable no-useless-escape */
/* eslint-disable prettier/prettier */

const REGEX = new RegExp('.*://(?:www.)?([^/]+)')

export const clearLink = (link: string) => {
  const [, domain] = link.match(REGEX) ?? []

  return domain
}
