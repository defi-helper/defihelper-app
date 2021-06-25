import { getAPIClient } from '~/api'
import {
  ProtocolCreateMutation,
  ProtocolCreateMutationVariables,
  ProtocolQuery,
  ProtocolQueryVariables,
  ProtocolsQuery,
  ProtocolsQueryVariables,
  ProtocolUpdateMutation,
  ProtocolUpdateMutationVariables
} from '~/graphql/_generated-types'
import { PROTOCOLS, PROTOCOL_CREATE, PROTOCOL_DETAIL } from './graphql'
import { PROTOCOL_UPDATE } from './graphql/protocol-update.graphql'

export const protocolsApi = {
  protocolsList: (variables: ProtocolsQueryVariables) =>
    getAPIClient()
      .query<ProtocolsQuery, ProtocolsQueryVariables>(PROTOCOLS, variables)
      .toPromise()
      .then(({ data }) => data?.protocols),

  protocolDetail: (variables: ProtocolQueryVariables) =>
    getAPIClient()
      .query<ProtocolQuery, ProtocolQueryVariables>(PROTOCOL_DETAIL, variables)
      .toPromise()
      .then(({ data }) => data?.protocol),

  protocolsCreate: (variables: ProtocolCreateMutationVariables) =>
    getAPIClient()
      .mutation<ProtocolCreateMutation, ProtocolCreateMutationVariables>(
        PROTOCOL_CREATE,
        variables
      )
      .toPromise()
      .then(({ data }) => data?.protocolCreate),

  protocolsUpdate: (variables: ProtocolUpdateMutationVariables) =>
    getAPIClient()
      .mutation<ProtocolUpdateMutation, ProtocolUpdateMutationVariables>(
        PROTOCOL_UPDATE,
        variables
      )
      .toPromise()
      .then(({ data }) => data?.protocolUpdate)
}
