import { TooltipRenderProps } from 'react-joyride'

import { Button } from '../button'
import { Typography } from '../typography'
import * as styles from './onboard-tooltip.css'

export const OnboardTooltip = ({
  continuous,
  step,
  primaryProps,
  tooltipProps,
  isLastStep,
}: TooltipRenderProps) => {
  return (
    <div {...tooltipProps} className={styles.root}>
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
      <div>
        {continuous && !isLastStep && (
          <Button
            color="blue"
            variant="outlined"
            {...primaryProps}
            size="small"
          >
            next step
          </Button>
        )}
      </div>
    </div>
  )
}
