import { RefObject, useEffect, useRef } from 'react'

type AnyEvent = MouseEvent | TouchEvent

export function useClickAway<T extends HTMLElement = HTMLElement>(
  ref1: RefObject<T>,
  handler: (event: AnyEvent) => void
): void {
  const handlerRef = useRef(handler)

  useEffect(() => {
    const listener = (event: AnyEvent) => {
      const el = ref1?.current

      const target = event.target as Node

      if (!el || el.contains(target)) {
        return
      }

      handlerRef.current(event)
    }

    document.addEventListener('mousedown', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
    }
  }, [ref1])
}
