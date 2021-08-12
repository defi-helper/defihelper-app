import { bignumberUtils } from '~/common/bignumber-utils'
import { Typography } from '~/common/typography'

export type GovernanceVoteInfoProps = {
  variant: 'for' | 'against' | 'abstain'
  active?: boolean
  onAddresses?: () => void
  count?: string
  total?: string
}

export const GovernanceVoteInfo: React.FC<GovernanceVoteInfoProps> = (
  props
) => {
  const percentage = bignumberUtils.getPercentage(props.count, props.total)

  return (
    <div>
      {props.variant}
      {props.active && (
        <Typography variant="body1" as="div">
          checked
          <br />
          voted
        </Typography>
      )}
      <Typography variant="h3" as="div">
        {percentage}% {props.children}
      </Typography>
      <Typography variant="body1" as="div">
        {bignumberUtils.format(props.count)} votes
      </Typography>
    </div>
  )
}
