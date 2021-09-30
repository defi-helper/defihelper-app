export const safeJsonParse = (values: string | undefined | null) => {
  try {
    return JSON.parse(values ?? '')
  } catch (error) {
    return undefined
  }
}
