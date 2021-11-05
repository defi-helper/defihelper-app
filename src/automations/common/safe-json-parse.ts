import memoize from 'fast-memoize'

export const safeJsonParse = memoize((values: string | undefined | null) => {
  try {
    return JSON.parse(values ?? '{}')
  } catch {
    return {}
  }
})
