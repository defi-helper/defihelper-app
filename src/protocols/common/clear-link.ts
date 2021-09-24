// eslint-disable-next-line no-useless-escape
const REGEX = /\/\/(.*?)\//

export const clearLink = (link: string) => {
  const [, domain] = link.match(REGEX) ?? []

  return domain
}
