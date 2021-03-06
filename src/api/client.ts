import memoize from 'fast-memoize'
import { GraphQLClient } from 'graphql-hooks'
import { SubscriptionClient } from 'subscriptions-transport-ws'

import { sidUtils } from '~/auth/common/sid-utils'
import { config } from '~/config'
import { Sentry } from '~/error-boundary'

const API_URL_ERROR_MESSAGE = 'config.API_URL is required'
const WS_API_URLERROR_MESSAGE = 'config.WS_API_URL is required'

const getWsClient = memoize(() => {
  const wsUrl = config.WS_API_URL

  if (!wsUrl) {
    throw new Error(WS_API_URLERROR_MESSAGE)
  }

  const wsClient = new SubscriptionClient(wsUrl, {
    reconnect: true,
    minTimeout: 15000,
    timeout: 15000,
    reconnectionAttempts: 5,
    lazy: true,
    inactivityTimeout: 5000,
  })

  return wsClient
})

export const getAPIClient = () => {
  const url = config.API_URL

  if (!url) {
    throw new Error(API_URL_ERROR_MESSAGE)
  }

  const wsClient = getWsClient()

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
    onError: ({ operation, result }) => {
      Sentry.log(
        new Error(
          result.error?.graphQLErrors?.[0].message ||
            result.error?.fetchError?.message ||
            result.error?.httpError?.statusText
        ),
        operation as unknown as Record<string, unknown>
      )
    },
  })

  return client
}
