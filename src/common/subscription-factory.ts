/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { UseSubscriptionOperation, ClientContext } from 'graphql-hooks'
import { useThrottle } from 'react-use'
import { useContext, useRef, useEffect, useState, useMemo } from 'react'

const TIME = 15000

function useSubscription<
  ResponseData = any,
  Variables extends object = object,
  TGraphQLError = object
>(
  options: UseSubscriptionOperation<Variables>,
  callback: (response: {
    data?: ResponseData
    errors?: TGraphQLError[]
  }) => void
): void {
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  const contextClient = useContext(ClientContext)
  const client = options.client || contextClient

  if (!client) {
    throw new Error(
      'useSubscription() requires a client to be passed in the options or as a context value'
    )
  }

  useEffect(() => {
    const request = {
      query: options.query,
      variables: options.variables,
    }

    const observable = client.createSubscription(request)

    const subscription = observable.subscribe({
      next: (result) => {
        callbackRef.current(result as any)
      },
      error: (errors) => {
        callbackRef.current({ errors } as any)
      },
      complete: () => {
        subscription.unsubscribe()
      },
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [options.variables]) // eslint-disable-line
  // the effect should be run when component is mounted and unmounted
}

export const subscriptionFactory = <T = unknown, Y extends object = object>(
  options: UseSubscriptionOperation<Y>
) => {
  return (
    callback: (response: { data?: T; errors?: unknown }) => void,
    variables?: Y
  ) => {
    const [response, setResponse] = useState<
      { data?: T; errors?: unknown } | undefined
    >()

    const throttledResponse = useThrottle(response, TIME)

    useEffect(() => {
      if (!throttledResponse) return

      callback(throttledResponse)
    }, [throttledResponse])

    const subscriptionParams = useMemo(
      () => ({
        ...options,
        variables,
      }),
      [variables]
    )

    return useSubscription<T, Y, unknown>(subscriptionParams, setResponse)
  }
}
