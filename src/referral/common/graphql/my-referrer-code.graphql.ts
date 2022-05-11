import { gql } from 'urql'
import { REFERRER_CODE } from './referrer-code.fragment.graphql'

export const MY_REFERRER_CODE = gql`
  query MyReferrerCode {
    me {
      referrerCode {
        ...referrerCode
      }
    }
  }
  ${REFERRER_CODE}
`
