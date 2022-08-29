import clsx from 'clsx'
import { cloneElement, useEffect, useState } from 'react'
import autosize from 'autosize'

import { Typography } from '~/common/typography'
import { useForkRef } from '~/common/hooks/use-fork-ref'
import { createComponent } from '~/common/create-component'
import * as styles from './input.css'

export type InputProps = Omit<React.ComponentProps<'input'>, 'type'> & {
  label?: React.ReactNode
  helperText?: React.ReactNode
  error?: boolean
  type?: React.ComponentProps<'input'>['type'] | 'textarea'
  leftSide?: React.ReactNode
  rightSide?: React.ReactNode
}

export const Input = createComponent<HTMLInputElement, InputProps>(
  function Input(props, ref) {
    const [focused, setFocus] = useState(false)

    const {
      className,
      label,
      type,
      error,
      helperText,
      disabled,
      leftSide,
      rightSide,
      ...restOfProps
    } = props

    const [textareaRef, setTextareaRef] = useState<HTMLTextAreaElement | null>(
      null
    )

    const localRef = useForkRef(
      ref as React.ForwardedRef<HTMLElement>,
      setTextareaRef as React.ForwardedRef<HTMLElement>
    )

    const component =
      type === 'textarea' ? (
        <textarea className={styles.textarea} ref={localRef} />
      ) : (
        <input ref={ref} type={type} />
      )

    useEffect(() => {
      if (textareaRef) {
        autosize(textareaRef)
      }
    }, [textareaRef])

    const handleToggleFocus = () => {
      setFocus(!focused)
    }

    return (
      <div
        className={clsx(
          styles.root,
          {
            [styles.error]: error,
            [styles.disabled]: disabled,
          },
          className
        )}
      >
        {label && (
          <Typography
            as="label"
            id={restOfProps.id}
            variant="body3"
            className={clsx(styles.fs14, styles.label)}
          >
            {label}
          </Typography>
        )}
        <div
          className={clsx(styles.inputWrap, {
            [styles.inputWrapFocus]: focused,
          })}
          onFocus={handleToggleFocus}
          onBlur={handleToggleFocus}
        >
          {leftSide && <div className={styles.leftSide}>{leftSide}</div>}
          {cloneElement(component, {
            ...component.props,
            ...restOfProps,
            className: clsx(styles.input, component.props.className),
          })}
          {rightSide && <div className={styles.rightSide}>{rightSide}</div>}
        </div>
        {helperText && (
          <Typography
            variant="body2"
            className={clsx(
              styles.helperText,
              styles.fs14,
              !error && styles.helperTextColor
            )}
            as="span"
          >
            {helperText}
          </Typography>
        )}
      </div>
    )
  }
)
