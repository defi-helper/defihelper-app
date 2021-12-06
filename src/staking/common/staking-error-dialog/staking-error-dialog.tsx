import { buildExplorerUrl } from '~/common/build-explorer-url'
import { Button } from '~/common/button'
import { cutAccount } from '~/common/cut-account'
import { Dialog } from '~/common/dialog'
import { Link } from '~/common/link'
import { Typography } from '~/common/typography'
import * as styles from './staking-error-dialog.css'

export type StakingErrorDialogProps = {
  address?: string
  network?: string
  contractName: string
  onCancel: () => void
}

export const StakingErrorDialog: React.VFC<StakingErrorDialogProps> = (
  props
) => {
  return (
    <Dialog className={styles.root}>
      <Typography variant="body2" align="center" className={styles.title}>
        Incorrect wallet.{' '}
        {props.address && props.network ? (
          <>
            Correct wallet is{' '}
            <Link
              href={buildExplorerUrl({
                address: props.address,
                network: props.network,
              })}
              target="_blank"
            >
              {cutAccount(props.address)}
            </Link>
          </>
        ) : (
          <>The {props.contractName} doesn&apos;t have a wallet</>
        )}
      </Typography>
      <Button className={styles.button} onClick={props.onCancel}>
        Ok
      </Button>
    </Dialog>
  )
}
