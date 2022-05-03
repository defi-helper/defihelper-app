import { GraphQLClient } from 'graphql-hooks'
import { SubscriptionClient } from 'subscriptions-transport-ws'

import { sidUtils } from '~/auth/common/sid-utils'
import { config } from '~/config'

const API_URL_ERROR_MESSAGE = 'config.API_URL is required'
const WS_API_URLERROR_MESSAGE = 'config.WS_API_URL is required'

export const getAPIClient = () => {
  const url = config.API_URL
  const wsUrl = config.WS_API_URL

  if (!url) {
    throw new Error(API_URL_ERROR_MESSAGE)
  }
  if (!wsUrl) {
    throw new Error(WS_API_URLERROR_MESSAGE)
  }

  const wsClient = new SubscriptionClient(wsUrl, { reconnect: true })

  const sid = sidUtils.get()

  const client = new GraphQLClient({
    url,
    fetchOptions: sid
      ? {
          headers: {
            Auth: sid,
          },
        }
      : {},
    subscriptionClient: () => wsClient,
  })

  return client
}
