import clsx from 'clsx'
import { isValidElement, cloneElement, useRef } from 'react'
import type { Placement } from '@popperjs/core'

import { useClickAway, usePopper } from '~/common/hooks'
import { Paper } from '~/common/paper'
import { Portal } from '~/common/portal'
import * as styles from './dropdown.css'

export type DropdownProps = {
  control: React.ReactNode | ((active: boolean) => JSX.Element)
  className?: string
  placement?: Placement
  offset?: number[]
}

export const Dropdown: React.FC<DropdownProps> = (props) => {
  if (!isValidElement(props.control) && typeof props.control !== 'function')
    throw new Error('control is not valid')

  const { placement = 'auto' } = props

  const localRef = useRef(null)

  const {
    popperStyles,
    popperAttributes,
    setPopperElement,
    setReferenceElement,
    referenceElement,
  } = usePopper({
    placement,
    modifiers: props.offset
      ? [usePopper.modifiers.getOffset(props.offset)]
      : undefined,
  })

  const handleOnClickControl = (event: Event | null) => {
    const target = (event?.currentTarget as HTMLElement) ?? null

    if (target && referenceElement) {
      setReferenceElement(null)
    } else {
      setReferenceElement(target)
    }
  }

  useClickAway(localRef, handleOnClickControl.bind(null, null))

  const control =
    typeof props.control === 'function'
      ? props.control(Boolean(referenceElement))
      : props.control

  return (
    <>
      {cloneElement(control, {
        ...control.props,
        ref: localRef,
        onClick: handleOnClickControl,
      })}
      {referenceElement && (
        <Portal>
          <Paper
            radius={8}
            ref={setPopperElement}
            {...popperAttributes}
            style={popperStyles}
            className={clsx(styles.dropdown, props.className)}
          >
            {props.children}
          </Paper>
        </Portal>
      )}
    </>
  )
}
