import { StakingContractFragmentFragment } from '~/graphql/_generated-types'
import { bignumberUtils } from '~/common/bignumber-utils'

export type StakingContractCardProps = {
  row: StakingContractFragmentFragment
  currentBlock: number
  activeChain?: string
}

export const StakingListRowSyncIndicator: React.VFC<StakingContractCardProps> =
  (props) => {
    const seemsUnusual = bignumberUtils.gt(
      bignumberUtils.minus(props.currentBlock, props.row.deployBlockNumber),
      100
    )

    if (!props.row.deployBlockNumber) {
      return <>not deployed</>
    }

    return (
      <span
        style={{
          color:
            seemsUnusual && props.row.network === props.activeChain
              ? 'red'
              : 'white',
        }}
      >
        {props.row.deployBlockNumber}/{props.currentBlock}
      </span>
    )
  }
