/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  Children,
  isValidElement,
  cloneElement,
  useState,
  useEffect,
} from 'react'
import clsx from 'clsx'
import isEmpty from 'lodash.isempty'

import { InputProps } from '~/common/input'
import { Dropdown } from '~/common/dropdown'
import { Icon } from '~/common/icon'
import { Typography } from '~/common/typography'
import { createComponent } from '~/common/create-component'
import { ButtonBase } from '~/common/button-base'
import { Checkbox } from '~/common/checkbox'
import * as styles from './select.css'

export type SelectProps = Omit<
  InputProps,
  'value' | 'defaultValue' | 'defaultChecked'
> & {
  sameWidth?: boolean
  value?: string | number | string[] | number[]
  defaultValue?: string | number | string[] | number[]
  multiple?: boolean
  clearable?: boolean
  header?: React.ReactNode
  footer?: React.ReactNode
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

        const localValueArr = (
          Array.isArray(localValue) ? localValue : [localValue]
        ).filter(Boolean)

        const childValueArr = localValueArr.includes(child.props.value)
          ? localValueArr.filter(
              (localValueItem) => localValueItem !== child.props.value
            )
          : [...localValueArr, child.props.value]

        const childValue = props.multiple ? childValueArr : child.props.value

        newEvent.target.value = childValue
        newEvent.target.name = props.name ?? ''
        newEvent.target.type = 'text'

        child.props.onClick?.(newEvent)

        setLocalValue(childValue)

        props.onChange?.(newEvent)
      }

    const valueMap = children.reduce<Map<string | number, any>>(
      (acc, child) => {
        if (isValidElement(child)) {
          acc.set(
            child.props.value,
            child.props.renderValue ?? child.props.children
          )
        }

        return acc
      },
      new Map<string, any>()
    )

    const renderValue = Array.isArray(localValue)
      ? localValue.map((localValueItem) => valueMap.get(localValueItem))
      : valueMap.get(localValue)

    const handleClearValue = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation()

      const newEvent = event as unknown as React.ChangeEvent<HTMLInputElement>

      newEvent.target.value = ''
      newEvent.target.name = props.name ?? ''
      newEvent.target.type = 'text'

      setLocalValue('')

      props.onChange?.(newEvent)
    }

    useEffect(() => {
      if (!value) return

      setLocalValue(value)
    }, [value])

    const localValueArr = Array.isArray(localValue)
      ? localValue
      : [localValue].filter(Boolean)

    const renderValueArr = Array.isArray(renderValue)
      ? renderValue
          .filter((item) => typeof item === 'string')
          .map((renderValueItem, index, arr) => (
            <React.Fragment key={String(index)}>
              {renderValueItem}
              {arr.length - 1 === index ? '' : ', '}
            </React.Fragment>
          ))
      : renderValue

    return (
      <div className={clsx(styles.root, className)}>
        <input
          type="hidden"
          ref={ref}
          value={Array.isArray(localValue) ? localValue.join(', ') : localValue}
          name={props.name}
          onChange={props.onChange}
        />
        <Dropdown
          control={(isOpen) => (
            <div
              className={clsx({
                [styles.error]: props.error,
                [styles.disabled]: props.disabled,
              })}
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
                <div className={styles.inputInner}>
                  {!isEmpty(renderValueArr)
                    ? renderValueArr
                    : props.placeholder}{' '}
                </div>
                {props.clearable && !isEmpty(localValue) ? (
                  <ButtonBase
                    onClick={handleClearValue}
                    className={styles.icon}
                  >
                    <Icon icon="close" height="24" width="24" />
                  </ButtonBase>
                ) : (
                  <Icon
                    icon={isOpen ? 'arrowUp' : 'arrowDown'}
                    height="18"
                    width="18"
                    className={styles.icon}
                  />
                )}
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
          )}
          className={styles.dropdown}
          placement="bottom-start"
          offset={[0, 8]}
          sameWidth={sameWidth}
          clickable={props.multiple}
        >
          {props.header}
          <div className={styles.dropdownInner}>
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
                    localValueArr.includes(child.props.value) && styles.active
                  ),
                  children: (
                    <>
                      {child.props.children}{' '}
                      {props.multiple && !child.props.disabled && (
                        <Checkbox
                          checked={localValueArr.includes(child.props.value)}
                          onChange={handleClickOnOption(child)}
                          className={styles.checkbox}
                        />
                      )}
                    </>
                  ),
                })
            )}
          </div>
          {props.footer}
        </Dropdown>
      </div>
    )
  }
)
