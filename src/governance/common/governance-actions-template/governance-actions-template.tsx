import { Typography } from '~/common/typography'
import { GovernanceActionsStepper } from '../governance-actions-stepper'
import { GovernanceAction } from '../governance.types'
import * as styles from './governance-actions-template.css'

export type GovernanceActionsTemplateProps = {
  onBack: () => void
  onSubmit: (action: GovernanceAction) => void
}

export const GovernanceActionsTemplate: React.VFC<GovernanceActionsTemplateProps> =
  (props) => {
    return (
      <GovernanceActionsStepper onBack={props.onBack}>
        <Typography
          variant="h3"
          family="mono"
          transform="uppercase"
          className={styles.title}
        >
          Choose template
        </Typography>
        <Typography className={styles.title}>methods with arguments</Typography>
      </GovernanceActionsStepper>
    )
  }
