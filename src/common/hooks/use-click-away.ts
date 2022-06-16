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

    document.addEventListener('click', listener)

    return () => {
      document.removeEventListener('click', listener)
    }
  }, [ref1])
}
