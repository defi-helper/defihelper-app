import { useEffect, useRef } from 'react'

export const useWindowEvent = <K extends keyof WindowEventMap>(
  type: K,
  listener: (this: Window, ev: WindowEventMap[K]) => unknown,
  options?: boolean | AddEventListenerOptions
) => {
  const listenerRef = useRef(listener)
  listenerRef.current = listener

  const optionsRef = useRef(options)
  optionsRef.current = options

  useEffect(() => {
    window.addEventListener(type, listenerRef.current, optionsRef.current)

    return () =>
      window.removeEventListener(type, listenerRef.current, optionsRef.current)
  }, [type])
}
