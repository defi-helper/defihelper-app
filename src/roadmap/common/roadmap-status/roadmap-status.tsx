import clsx from 'clsx'
import { forwardRef } from 'react'
import { ButtonBase } from '~/common/button-base'

import { Typography } from '~/common/typography'
import { STATUSES } from '../constants'
import * as styles from './roadmap-status.css'

export type RoadmapStatusProps = {
  children: keyof typeof STATUSES
}

const RoadmapStatus = (
  props: RoadmapStatusProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) => {
  const { children, ...restOfProps } = props

  return (
    <ButtonBase
      className={clsx(styles.root, styles.colors[children])}
      ref={ref}
      {...restOfProps}
    >
      <Typography variant="body3" as="span" family="mono" transform="uppercase">
        {STATUSES[children]}
      </Typography>
    </ButtonBase>
  )
}

const Component = forwardRef(RoadmapStatus)

export { Component as RoadmapStatus }
