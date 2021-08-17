import { Button } from '~/common/button'
import { Typography } from '~/common/typography'
import * as styles from './governance-actions-inital.css'

export type GovernanceActionsInitialProps = {
  onManually: () => void
  onTemplate: () => void
}

export const GovernanceActionsInitial: React.VFC<GovernanceActionsInitialProps> =
  (props) => {
    return (
      <>
        <Typography
          align="center"
          family="mono"
          transform="uppercase"
          className={styles.title}
        >
          Actions will be automatically executed if the voting on the proposal
          is successful
        </Typography>
        <Button onClick={props.onManually} className={styles.button}>
          Set up manually
        </Button>
        <Button onClick={props.onTemplate} className={styles.button}>
          Use template
        </Button>
      </>
    )
  }
