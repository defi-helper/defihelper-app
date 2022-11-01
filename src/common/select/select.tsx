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
import { SelectOption } from './select-option'
import * as styles from './select.css'

export type SelectProps = Omit<
  InputProps,
  'value' | 'defaultValue' | 'defaultChecked'
> & {
  sameWidth?: boolean
  value?: string | number | string[] | number[]
  defaultValue?: string | number | string[] | number[]
  multiple?: boolean
  grouped?: boolean
  clearable?: boolean
  header?: React.ReactNode
  footer?: React.ReactNode
}

export const Select = createComponent<HTMLInputElement, SelectProps>(
  function Select(props, ref) {
    const {
      sameWidth = true,
      value,
      grouped,
      multiple,
      defaultValue,
      className,
    } = props

    const [localValue, setLocalValue] = useState(defaultValue ?? value ?? '')

    const children = Children.toArray(props.children)

    const [, groupedChildren] = children.reduce<
      [string, Record<string, { group: string; value: any }>]
    >(
      ([lastGroup, acc], child) => {
        let newLastGroup = lastGroup

        if (!isValidElement(child)) return [newLastGroup, acc]

        if (child.type !== SelectOption) {
          newLastGroup = child.props.children
        }

        if (child.type === SelectOption) {
          acc[child.props.value] = {
            group: newLastGroup,
            value: child.props.renderValue ?? child.props.children,
          }
        }

        return [newLastGroup, acc]
      },
      ['', {}]
    )

    const handleClickOnOption =
      (
        child:
          | React.ReactElement<
              unknown,
              string | React.JSXElementConstructor<unknown>
            >
          | React.ReactPortal,

        cb?: () => void
      ) =>
      (event: React.ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation()

        const newEvent = event

        const localValueArr = (
          Array.isArray(localValue) ? localValue : [localValue]
        ).filter(Boolean)

        const childValueArr = localValueArr.includes(child.props.value)
          ? localValueArr.filter(
              (localValueItem) => localValueItem !== child.props.value
            )
          : [...localValueArr, child.props.value]

        const childGroupedValues = Object.values(
          childValueArr.reduce<Record<string, string | number>>(
            (acc, localVal) => {
              acc[groupedChildren[localVal].group] = localVal

              return acc
            },
            {}
          )
        )

        const childPropsValues = grouped
          ? childGroupedValues
          : child.props.value

        const childValue = multiple ? childValueArr : childPropsValues

        newEvent.target.value = childValue
        newEvent.target.name = props.name ?? ''
        newEvent.target.type = 'text'

        child.props.onClick?.(newEvent)

        setLocalValue(childValue)

        props.onChange?.(newEvent)

        if (!props.header || !multiple || !grouped) {
          cb?.()
        }
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
      ? renderValue.map((renderValueItem, index, arr) => (
          <React.Fragment key={String(index)}>
            {renderValueItem}
            {arr.length - 1 === index || typeof renderValueItem === 'object'
              ? ''
              : ', '}
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
                  variant="body3"
                  className={clsx(styles.fs14, styles.label)}
                >
                  {props.label}
                </Typography>
              )}
              <div
                className={styles.input}
                data-placeholder={props.placeholder}
              >
                {props.leftSide}
                <div className={styles.inputInner}>
                  {!isEmpty(renderValueArr)
                    ? renderValueArr
                    : props.placeholder}{' '}
                </div>
                {props.rightSide}
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
        >
          {(cb) => (
            <>
              {props.header}
              <div className={styles.dropdownInner}>
                {Children.map(
                  children,
                  (child) =>
                    isValidElement(child) &&
                    cloneElement(child, {
                      ...child.props,
                      onClick: child.props.value
                        ? handleClickOnOption(child, cb)
                        : (e: unknown) => {
                            child.props.onClick?.(e)
                            cb()
                          },
                      className: clsx(
                        child.type === SelectOption && styles.option,
                        child.type !== SelectOption && styles.groupTitle,
                        child.props.className
                      ),
                      children: (
                        <>
                          {child.props.children}
                          {child.type === SelectOption &&
                            localValueArr.includes(child.props.value) && (
                              <Icon
                                icon="checked"
                                className={styles.checkbox}
                              />
                            )}
                        </>
                      ),
                    })
                )}
              </div>
              {isValidElement(props.footer) &&
                cloneElement(props.footer, {
                  ...props.footer.props,
                  onClick: () => {
                    if (!isValidElement(props.footer)) return
                    props.footer?.props.onClick()
                    cb()
                  },
                })}
            </>
          )}
        </Dropdown>
      </div>
    )
  }
)
