import { useEffect } from 'react'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

export const useBodyScrollLock = (
  targetElement: HTMLElement | Element | null
) => {
  useEffect(() => {
    if (!targetElement) return

    disableBodyScroll(targetElement)

    return () => enableBodyScroll(targetElement)
  }, [targetElement])
}
