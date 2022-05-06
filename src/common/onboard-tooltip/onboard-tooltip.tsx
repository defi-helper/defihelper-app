import { TooltipRenderProps } from '@defihelper/react-joyride'

import { Button } from '../button'
import { ButtonBase } from '../button-base'
import { Icon } from '../icon'
import { Typography } from '../typography'
import * as styles from './onboard-tooltip.css'

type Props = TooltipRenderProps['step'] & {
  action?: () => JSX.Element
  closeButton?: string
}

export const OnboardTooltip = ({
  step,
  primaryProps,
  tooltipProps,
  closeProps,
}: Omit<TooltipRenderProps, 'step'> & { step: Props }) => {
  return (
    <div {...tooltipProps} className={styles.root}>
      <ButtonBase {...closeProps} className={styles.close}>
        <Icon icon="close" />
      </ButtonBase>
      {step.title && (
        <Typography
          as="div"
          variant="body3"
          family="mono"
          transform="uppercase"
        >
          {step.title}
        </Typography>
      )}
      {step.content && (
        <Typography
          as="div"
          variant="body3"
          family="mono"
          transform="uppercase"
          className={styles.content}
        >
          {step.content}
        </Typography>
      )}
      <div className={styles.buttons}>
        <Button
          variant="outlined"
          {...primaryProps}
          size="small"
          className={styles.next}
        >
          {step.closeButton || 'next step'}
        </Button>
        {step.action && <step.action />}
      </div>
    </div>
  )
}
