import { TooltipRenderProps } from '@defihelper/react-joyride'

import { Button } from '../button'
import { ButtonBase } from '../button-base'
import { Icon } from '../icon'
import { Typography } from '../typography'
import * as styles from './onboard-tooltip.css'

export const OnboardTooltip = ({
  continuous,
  step,
  primaryProps,
  tooltipProps,
  isLastStep,
  closeProps,
  action,
}: TooltipRenderProps & { action?: () => JSX.Element }) => {
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
        {continuous && !isLastStep && (
          <Button variant="outlined" {...primaryProps} size="small">
            next step
          </Button>
        )}
        {action}
      </div>
    </div>
  )
}
