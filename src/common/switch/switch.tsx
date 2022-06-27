import clsx from 'clsx'
import { cloneElement } from 'react'

import { createComponent } from '~/common/create-component'
import { Icon } from '~/common/icon'

import * as styles from './switch.css'

type Components = {
  input: React.ReactElement
  thumb: React.ReactElement
  track: React.ReactElement
}

export type SwitchProps = Omit<
  React.ComponentProps<'input'>,
  'type' | 'value' | 'defaultValue' | 'size'
> & {
  components?: Partial<Components>
  error?: boolean
  size?: 'small' | 'medium'
}

const defaultComponents: Components = {
  input: <input />,
  thumb: <span />,
  track: <span />,
}

export const Switch = createComponent<HTMLInputElement, SwitchProps>(
  function Switch(props, ref) {
    const {
      components,
      className,
      error,
      size = 'medium',
      ...restOfProps
    } = props

    const currentComponents = {
      input: components?.input ?? defaultComponents.input,
      thumb: components?.thumb ?? defaultComponents.thumb,
      track: components?.track ?? defaultComponents.track,
    }

    return (
      <span className={clsx(styles.root, styles.rootSizes[size], className)}>
        {cloneElement(currentComponents.input, {
          ...currentComponents.input.props,
          ...restOfProps,
          type: 'checkbox',
          className: clsx(
            styles.input,
            currentComponents.input.props.className
          ),
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
            styles.thumbSizes[size],
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
  }
)
