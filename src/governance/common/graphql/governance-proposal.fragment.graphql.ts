import { gql } from '@urql/core'

export const GOVERNANCE_PROPOSAL_FRAGMENT = gql`
  fragment governanceProposalFragment on GovProposalType {
    id
    proposer
    eta
    targets
    values
    signatures
    calldatas
    startBlock
    endBlock
    forVotes
    againstVotes
    abstainVotes
    canceled
    executed
    state
    description
    endVoteDate
  }
`
