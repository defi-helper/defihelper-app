import clsx from 'clsx'
import { useState } from 'react'
import { animated } from '@react-spring/web'

import { useBodyScrollLock } from '~/common/hooks'
import { Paper } from '~/common/paper'
import { useAnimatedContext } from './dialog.context'
import { ButtonBase } from '../button-base'
import { Icon } from '../icon'
import * as styles from './dialog.css'

export type DialogProps = {
  className?: string
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
    <AnimatedPaper
      {...animatedValue}
      onMouseDown={handleOnClickContent}
      className={clsx(styles.content, props.className)}
      radius={8}
      ref={handleSetContent}
    >
      <ButtonBase onClick={onClose} className={styles.closeButton}>
        <Icon icon="close" width="34" height="34" />
      </ButtonBase>
      {props.children}
    </AnimatedPaper>
  )
}
