/* eslint-disable @typescript-eslint/ban-types */
import clsx from 'clsx'
import { useState } from 'react'
import { animated, AnimatedProps } from '@react-spring/web'

import { useBodyScrollLock } from '~/common/hooks'
import { Paper } from '~/common/paper'
import { useAnimatedContext } from './dialog.context'
import { ButtonBase } from '../button-base'
import { Icon } from '../icon'
import * as styles from './dialog.css'

export type DialogProps = {
  className?: string
  onBack?: () => void
  onClose?: () => void
}

const AnimatedPaper = animated(Paper)

export const Dialog: React.FC<DialogProps> = (props) => {
  const handleOnClickContent = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => event.stopPropagation()

  const [contentElement, setContentElement] = useState<HTMLDivElement | null>(
    null
  )
  useBodyScrollLock(contentElement)

  const handleSetContent = (instance: HTMLDivElement | null) => {
    setContentElement(instance)
  }

  const { animatedValue, onClose } = useAnimatedContext()

  return (
    <>
      <AnimatedPaper
        {...(animatedValue as AnimatedProps<object>)}
        onMouseDown={handleOnClickContent}
        className={clsx(styles.content, props.className)}
        radius={8}
        ref={handleSetContent}
      >
        <ButtonBase
          onClick={props.onClose ?? props.onBack ?? onClose}
          className={styles.closeButton}
        >
          <Icon icon="close" width="44" height="44" />
        </ButtonBase>
        {props.children}
      </AnimatedPaper>
      <animated.div
        onMouseDown={props.onClose ?? onClose}
        aria-hidden="true"
        className={styles.backdrop}
        style={{ opacity: animatedValue.style?.opacity }}
      />
    </>
  )
}
