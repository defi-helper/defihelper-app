import clsx from 'clsx'
import { cloneElement, forwardRef } from 'react'
import { Icon } from '../icon'

import * as styles from './switch.css'

type Components = {
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
  thumb: <span />,
  track: <span />,
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  props,
  ref
) {
  const {
    components = defaultComponents,
    className,
    error,
    ...restOfProps
  } = props

  const currentComponents = {
    ...defaultComponents,
    ...components,
  }

  return (
    <span className={clsx(styles.root, className)}>
      <input
        ref={ref}
        {...restOfProps}
        type="checkbox"
        className={styles.input}
      />
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
