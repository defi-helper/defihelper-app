import { useMemo, ForwardedRef } from 'react'

const setRef = (ref: ForwardedRef<HTMLElement>, value: HTMLElement | null) => {
  if (typeof ref === 'function') {
    ref(value)
  } else if (ref) {
    // eslint-disable-next-line no-param-reassign
    ref.current = value
  }
}

export const useForkRef = (
  refA: ForwardedRef<HTMLElement>,
  refB: ForwardedRef<HTMLElement>
) => {
  return useMemo(() => {
    if (refA == null && refB == null) {
      return null
    }

    return (refValue: HTMLElement | null) => {
      setRef(refA, refValue)
      setRef(refB, refValue)
    }
  }, [refA, refB])
}
