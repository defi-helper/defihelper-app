const TITLE_REGEX = /\n/g

export const parseDescription = (description: string) => {
  const [title] = description.split(TITLE_REGEX) ?? []

  return {
    title: title.replace('#', ''),
    description: description.replace(title, ''),
  }
}
