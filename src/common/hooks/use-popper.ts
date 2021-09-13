import { useCallback, useRef, useState } from 'react'
import * as Popper from 'react-popper'
import * as PopperJS from '@popperjs/core'

const sameWidth: Popper.Modifier<string, Record<string, unknown>> = {
  name: 'sameWidth',
  enabled: true,
  phase: 'beforeWrite',
  requires: ['computeStyles'],
  fn: ({ state }) => {
    // eslint-disable-next-line no-param-reassign
    state.styles.popper.width = `${state.rects.reference.width}px`
  },
  effect: ({ state }) => {
    if (state.elements.reference instanceof HTMLElement) {
      // eslint-disable-next-line no-param-reassign
      state.elements.popper.style.width = `${state.elements.reference.offsetWidth}px`
    }
  },
}

type Modifiers = 'sameWidth'

const modifiers: Record<
  Modifiers,
  Popper.Modifier<string, Record<string, unknown>>
> = {
  sameWidth,
}

type Options = Omit<Partial<PopperJS.Options>, 'modifiers'> & {
  modifiers?: Modifiers
}

export const usePopper = (options?: Options) => {
  const optionsRef = useRef({
    ...options,
    modifiers: options?.modifiers ? [modifiers[options.modifiers]] : undefined,
  })

  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(
    null
  )
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null)

  const handleSetReferenceElement = useCallback(
    (instance: HTMLElement | null) => setReferenceElement(instance),
    []
  )
  const handleSetPopperElement = useCallback(
    (instance: HTMLElement | null) => setPopperElement(instance),
    []
  )

  const popper = Popper.usePopper(
    referenceElement,
    popperElement,
    optionsRef.current
  )

  return {
    popperStyles: popper.styles.popper,
    popperAttributes: popper.attributes.popper,
    setReferenceElement: handleSetReferenceElement,
    setPopperElement: handleSetPopperElement,
  }
}
