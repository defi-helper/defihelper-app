/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Children,
  isValidElement,
  cloneElement,
  useState,
  useEffect,
} from 'react'
import clsx from 'clsx'

import { InputProps } from '~/common/input'
import { Dropdown } from '~/common/dropdown'
import { createComponent } from '~/common/create-component'
import * as styles from './select.css'
import { Typography } from '../typography'

export type SelectProps = Omit<InputProps, 'value' | 'defaultValue'> & {
  sameWidth?: boolean
  value?: string | number
  defaultValue?: string | number
}

export const Select = createComponent<HTMLInputElement, SelectProps>(
  function Select(props, ref) {
    const { sameWidth = true, value, defaultValue, className } = props

    const [localValue, setLocalValue] = useState(defaultValue ?? value ?? '')

    const children = Children.toArray(props.children)

    const handleClickOnOption =
      (
        child:
          | React.ReactElement<
              unknown,
              string | React.JSXElementConstructor<unknown>
            >
          | React.ReactPortal
      ) =>
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const newEvent = event

        newEvent.target.value = child.props.value
        newEvent.target.name = props.name ?? ''
        newEvent.target.type = 'text'

        child.props.onClick?.(event)

        setLocalValue(child.props.value)

        props.onChange?.(event)
      }

    const valueMap = children.reduce<Map<string | number, any>>(
      (acc, child) => {
        if (isValidElement(child)) {
          acc.set(child.props.value, child.props.children)
        }

        return acc
      },
      new Map<string, any>()
    )

    const renderValue = valueMap.get(localValue)

    useEffect(() => {
      if (value) {
        setLocalValue(value)
      }
    }, [value])

    return (
      <div className={clsx(styles.root, className)}>
        <input
          type="hidden"
          ref={ref}
          value={localValue}
          name={props.name}
          onChange={props.onChange}
        />
        <Dropdown
          control={
            <div
              className={clsx(
                {
                  [styles.error]: props.error,
                  [styles.disabled]: props.disabled,
                },
                className
              )}
            >
              {props.label && (
                <Typography
                  as="span"
                  variant="body2"
                  family="mono"
                  transform="uppercase"
                  className={clsx(styles.fs14, styles.label)}
                >
                  {props.label}
                </Typography>
              )}
              <div
                className={styles.input}
                data-placeholder={props.placeholder}
              >
                {renderValue}
              </div>
              {props.helperText && (
                <Typography
                  variant="body2"
                  className={clsx(
                    styles.helperText,
                    styles.fs14,
                    !props.error && styles.helperTextColor
                  )}
                  as="span"
                >
                  {props.helperText}
                </Typography>
              )}
            </div>
          }
          className={styles.dropdown}
          placement="bottom-start"
          offset={[0, 8]}
          sameWidth={sameWidth}
        >
          {Children.map(
            children,
            (child) =>
              isValidElement(child) &&
              cloneElement(child, {
                ...child.props,
                onClick: handleClickOnOption(child),
                className: clsx(
                  styles.option,
                  child.props.className,
                  child.props.value === localValue && styles.active
                ),
              })
          )}
        </Dropdown>
      </div>
    )
  }
)
