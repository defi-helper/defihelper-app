import {
  forwardRef,
  Children,
  isValidElement,
  cloneElement,
  useState,
} from 'react'
import clsx from 'clsx'

import { Input, InputProps } from '~/common/input'
import { Dropdown } from '~/common/dropdown'
import * as styles from './select.css'

export type SelectProps = Omit<InputProps, 'value' | 'defaultValue'> & {
  sameWidth?: boolean
  value?: string | number
  defaultValue?: string | number
}

export const Select = forwardRef<HTMLInputElement, SelectProps>(
  (props, ref) => {
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

    const valueMap = children.reduce<Map<string | number, unknown>>(
      (acc, child) => {
        if (isValidElement(child)) {
          acc.set(child.props.value, child.props.children)
        }

        return acc
      },
      new Map<string, unknown>()
    )

    const renderValue = valueMap.get(localValue)

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
            <Input
              placeholder={props.placeholder}
              label={props.label}
              value={
                typeof renderValue === 'number' ||
                typeof renderValue === 'string'
                  ? renderValue
                  : ''
              }
              readOnly
              disabled={props.disabled}
              error={props.error}
              helperText={props.helperText}
            />
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
