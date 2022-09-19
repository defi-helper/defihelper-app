import { config } from '~/config'
import { Link } from '~/common/link'
import { bignumberUtils } from '~/common/bignumber-utils'
import { ButtonBase } from '~/common/button-base'
import { Dropdown } from '~/common/dropdown'
import { Icon } from '~/common/icon'
import { Typography } from '~/common/typography'
import * as styles from './invest-fee.css'

export type InvestFeeProps = {
  fee?: {
    native: string
    usd: string
  }
  tokenSymbol: string
}

export const InvestFee = (props: InvestFeeProps) => (
  <div className={styles.serviceFee}>
    <Typography
      transform="uppercase"
      family="mono"
      variant="body3"
      as="div"
      className={styles.serviceFeeTitle}
    >
      <Typography variant="inherit">service fee</Typography>
      <Dropdown
        control={
          <ButtonBase>
            <Icon icon="question" width={14} height={14} />
          </ButtonBase>
        }
        className={styles.serviceFeeDropdown}
        placement="bottom-start"
        offset={[0, 4]}
      >
        <Typography variant="body3">
          We will charge you ${bignumberUtils.format(props.fee?.usd)} for this
          operation. This revenue will be distributed to DFH Governance token
          holders.{' '}
          <Link color="blue" href={`${config.MAIN_URL}tokenomics`}>
            Read more about DFH token
          </Link>
        </Typography>
      </Dropdown>
    </Typography>
    <Typography variant="body2">
      {bignumberUtils.format(props.fee?.native, 3)} {props.tokenSymbol} ($
      {bignumberUtils.format(props.fee?.usd)})
    </Typography>
  </div>
)
