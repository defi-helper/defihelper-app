/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import {
  createClient,
  OperationContext,
  OperationResult,
  TypedDocumentNode,
  defaultExchanges,
  subscriptionExchange,
} from '@urql/core'
import memoize from 'fast-memoize'
import { DocumentNode } from 'graphql'
import { pipe, subscribe } from 'wonka'
import { createClient as createWSClient } from 'graphql-ws'

import { sidUtils } from '~/auth/common/sid-utils'
import { config } from '~/config'

const ERROR_MESSAGE = 'config.API_URL is required'

export const getAPIClient = memoize(() => {
  const url = config.API_URL
  const wsUrl = config.WS_API_URL

  if (!url || !wsUrl) {
    throw new Error(ERROR_MESSAGE)
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

  const { subscription: urqlSubscription, ...restOfClient } = client

  return {
    ...restOfClient,
    subscription: <Data = any, Variables extends object = {}>(
      args: {
        query: DocumentNode | TypedDocumentNode<Data, Variables> | string
        variables?: Variables
        context?: Partial<OperationContext>
      },
      cb: (result: OperationResult<Data, Variables>) => void
    ) => {
      const { unsubscribe } = pipe(
        client.subscription<Data, Variables>(
          args.query,
          args.variables,
          args.context
        ),
        subscribe(cb)
      )

      return unsubscribe
    },
  }
})
