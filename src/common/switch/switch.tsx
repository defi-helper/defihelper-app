import clsx from 'clsx'
import { cloneElement, forwardRef } from 'react'
import { Icon } from '../icon'

import * as styles from './switch.css'

type Components = {
  input: React.ReactElement
  thumb: React.ReactElement
  track: React.ReactElement
}

export type SwitchProps = Omit<
  React.ComponentProps<'input'>,
  'type' | 'value' | 'defaultValue'
> & {
  components?: Partial<Components>
  error?: boolean
}

const defaultComponents: Components = {
  input: <input />,
  thumb: <span />,
  track: <span />,
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  props,
  ref
) {
  const { components, className, error, ...restOfProps } = props

  const currentComponents = {
    input: components?.input ?? defaultComponents.input,
    thumb: components?.thumb ?? defaultComponents.thumb,
    track: components?.track ?? defaultComponents.track,
  }

  return (
    <span className={clsx(styles.root, className)}>
      {cloneElement(currentComponents.input, {
        ...currentComponents.input.props,
        ...restOfProps,
        type: 'checkbox',
        className: clsx(styles.input, currentComponents.input.props.className),
        ref,
      })}
      {cloneElement(currentComponents.track, {
        ...currentComponents.track.props,
        className: clsx(
          styles.track,
          error && styles.trackError,
          currentComponents.track.props.className
        ),
      })}
      {cloneElement(currentComponents.thumb, {
        ...currentComponents.thumb.props,
        className: clsx(
          styles.thumb,
          error && styles.thumbError,
          currentComponents.thumb.props.className
        ),
        children: error ? (
          <Icon icon="exclamation" width="2" height="12" />
        ) : (
          currentComponents.thumb.props.children
        ),
      })}
    </span>
  )
})
