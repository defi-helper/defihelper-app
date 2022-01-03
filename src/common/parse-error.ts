const isEthereumError = (
  value: unknown
): value is { error: { message: string } } => {
  return typeof value === 'object' && value !== null && 'error' in value
}

const isMetamaskError = (
  value: unknown
): value is { message: string; code: number } => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'message' in value &&
    'code' in value
  )
}

export const parseError = (value: unknown) => {
  if (typeof value === 'string') {
    return new Error(value)
  }

  if (isEthereumError(value)) {
    return new Error(value.error.message)
  }

  if (value instanceof Error) {
    return value
  }

  if (isMetamaskError(value)) {
    return new Error(value.message)
  }

  return new Error('unknown error')
}
