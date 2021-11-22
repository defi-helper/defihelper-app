import { getAPIClient } from '~/api'
import { MeQuery, MeQueryVariables } from '~/graphql/_generated-types'
import { ME } from './graphql'

export const authApi = {
  me: () =>
    getAPIClient()
      .query<MeQuery, MeQueryVariables>(ME)
      .toPromise()
      .then(({ data }) => data?.me),
}
