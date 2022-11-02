import { gql } from 'urql'

export const ZAP_FEE_PAY_CREATE = gql`
  mutation ZapFeePayCreate($input: ZAPFeePayCreateInputType!) {
    zapFeePayCreate(input: $input)
  }
`
