import { useCallback, useRef, useState } from 'react'
import * as Popper from 'react-popper'
import * as PopperJS from '@popperjs/core'

const sameWidth: Partial<PopperJS.Modifier<string, unknown>> = {
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

const getOffset = (
  offset: number[]
): Partial<PopperJS.Modifier<string, unknown>> => ({
  name: 'offset',
  options: {
    offset,
  },
})

const modifiers = {
  sameWidth,
  getOffset,
}

export const usePopper = (options?: Partial<PopperJS.Options>) => {
  const optionsRef = useRef(options)

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

  const { attributes, styles } = Popper.usePopper(
    referenceElement,
    popperElement,
    optionsRef.current
  )

  return {
    popperAttributes: attributes.popper,
    popperStyles: styles.popper,
    popperElement,
    referenceElement,
    setReferenceElement: handleSetReferenceElement,
    setPopperElement: handleSetPopperElement,
  }
}

usePopper.modifiers = modifiers
