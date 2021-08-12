const TITLE_REGEX = /(# | \s#) |\n/g

export const parseDescription = (description: string) => {
  const [title] = description.split(TITLE_REGEX) ?? []

  return {
    title,
    description: description.replace(title, ''),
  }
}
