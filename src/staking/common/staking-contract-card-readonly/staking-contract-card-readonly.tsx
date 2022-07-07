/* eslint-disable jsx-a11y/click-events-have-key-events */
import clsx from 'clsx'
import { Link as ReactRouterLink } from 'react-router-dom'

import { Can } from '~/auth'
import { bignumberUtils } from '~/common/bignumber-utils'
import { ButtonBase } from '~/common/button-base'
import { Dropdown } from '~/common/dropdown'
import { Icon } from '~/common/icon'
import { Typography } from '~/common/typography'
import { paths } from '~/paths'
import { ContractDebank } from '~/staking/common/staking.types'
import * as styles from './staking-contract-card-readonly.css'

export type StakingContractCardReadonlyProps = {
  className?: string
  protocolId: string
  protocolAdapter: string
  onToggleContract: () => void
  onDelete: () => void
} & ContractDebank

export const StakingContractCardReadonly: React.VFC<StakingContractCardReadonlyProps> =
  (props) => {
    const { metric } = props

    return (
      <div className={clsx(styles.root, props.className)}>
        <div className={styles.tableCol}>
          <Typography variant="body2" as="div">
            {props.name}
          </Typography>
        </div>
        <div>
          <Typography
            variant="body2"
            as="div"
            family="mono"
            transform="uppercase"
            align="right"
          >
            ${bignumberUtils.format(metric.myStaked)}
          </Typography>
        </div>
        <div>
          <Typography
            variant="body2"
            as="div"
            family="mono"
            transform="uppercase"
            align="right"
          >
            ${bignumberUtils.format(metric.myEarned)}
          </Typography>
        </div>
        <div className={clsx(styles.tableCol)}>
          <Can I="update" a="Contract">
            <Dropdown
              control={
                <ButtonBase className={styles.manageButton}>
                  <Icon icon="dots" />
                </ButtonBase>
              }
            >
              <Can I="update" a="Contract">
                <ButtonBase
                  as={ReactRouterLink}
                  to={`${paths.staking.update(
                    props.protocolId,
                    props.id
                  )}?protocol-adapter=${props.protocolAdapter}`}
                >
                  Edit
                </ButtonBase>
              </Can>
              <Can I="update" a="Contract">
                <ButtonBase onClick={props.onToggleContract}>
                  {props.hidden ? 'Show' : 'Hide'}
                </ButtonBase>
              </Can>
              <Can I="delete" a="Contract">
                <ButtonBase onClick={props.onDelete}>Delete</ButtonBase>
              </Can>
            </Dropdown>
          </Can>
        </div>
      </div>
    )
  }
