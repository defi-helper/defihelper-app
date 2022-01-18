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
    return props.row.deployBlockNumber ? (
      <span
        style={{
          color:
            seemsUnusual && props.row.network === props.activeChain
              ? 'red'
              : 'white',
        }}
      >
        <br />
        {props.row.deployBlockNumber}/{props.currentBlock}
      </span>
    ) : (
      <>
        <br /> not deployed
      </>
    )
  }
