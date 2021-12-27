import { createClient, defaultExchanges, subscriptionExchange } from 'urql'
import memoize from 'fast-memoize'
import { createClient as createWSClient } from 'graphql-ws'

import { sidUtils } from '~/auth/common/sid-utils'
import { config } from '~/config'

const API_URL_ERROR_MESSAGE = 'config.API_URL is required'
const WS_API_URLERROR_MESSAGE = 'config.WS_API_URL is required'

export const getAPIClient = memoize(() => {
  const url = config.API_URL
  const wsUrl = config.WS_API_URL

  if (!url) {
    throw new Error(API_URL_ERROR_MESSAGE)
  }
  if (!wsUrl) {
    throw new Error(WS_API_URLERROR_MESSAGE)
  }

  const wsClient = createWSClient({
    url: wsUrl,
  })

  const client = createClient({
    url,
    fetchOptions: () => {
      const sid = sidUtils.get()

      return sid
        ? {
            headers: {
              Auth: sid,
            },
          }
        : {}
    },
    exchanges: [
      ...defaultExchanges,
      subscriptionExchange({
        forwardSubscription: (operation) => ({
          subscribe: (sink) => ({
            unsubscribe: wsClient.subscribe(operation, sink),
          }),
        }),
      }),
    ],
  })

  return client
})
