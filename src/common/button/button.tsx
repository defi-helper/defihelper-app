import { cloneElement, forwardRef } from 'react'
import clsx from 'clsx'

export type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  as?: React.ReactElement
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    const { as = <button type="button" />, className, ...restOfProps } = props

    return cloneElement(as, {
      ...restOfProps,
      ...as.props,
      ref,
      className: clsx(className, as.props.className)
    })
  }
)
