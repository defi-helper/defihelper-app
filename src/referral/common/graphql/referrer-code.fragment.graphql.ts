import { gql } from 'urql'

export const REFERRER_CODE = gql`
  fragment referrerCode on UserReferrerCodeType {
    code
    redirectTo
    usedTimes
    visits
  }
`
