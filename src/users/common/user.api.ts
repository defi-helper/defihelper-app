import { getAPIClient } from '~/api'
import { MeQuery, MeQueryVariables } from '~/graphql/_generated-types'
import { ME } from './graphql'

const LIMIT = 1000

export const userApi = {
  me: () =>
    getAPIClient()
      .query<MeQuery, MeQueryVariables>(ME, { pagination: { limit: LIMIT } })
      .toPromise()
      .then(({ data }) => data?.me),
}
