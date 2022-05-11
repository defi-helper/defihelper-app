import { getAPIClient } from '~/api'
import {
  MyReferrerCodeQuery,
  MyReferrerCodeQueryVariables,
} from '~/api/_generated-types'
import { MY_REFERRER_CODE } from './graphql/my-referrer-code.graphql'

export const referralApi = {
  getMyReferrerCode: (variables: MyReferrerCodeQueryVariables) =>
    getAPIClient()
      .request<MyReferrerCodeQuery, unknown, MyReferrerCodeQueryVariables>({
        query: MY_REFERRER_CODE.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.me?.referrerCode),
}
