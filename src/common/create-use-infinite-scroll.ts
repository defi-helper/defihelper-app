import useInfiniteScroll, {
  UseInfiniteScrollHookArgs,
} from 'react-infinite-scroll-hook'
import { combine, Domain, Store, sample } from 'effector'
import { useStore } from 'effector-react'

const DEFAULT_LIMIT = 10

type Options = Omit<
  UseInfiniteScrollHookArgs,
  'onLoadMore' | 'loading' | 'hasNextPage'
> & {
  domain: Domain
  limit?: number
  loading: Store<boolean>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: Store<Array<any>>
}

export const createUseInfiniteScroll = (options: Options) => {
  const {
    rootMargin = '0px 0px 40% 0px',
    domain,
    limit: optLimit = DEFAULT_LIMIT,
    loading: optLoading,
    items: optItems,
    ...rest
  } = options

  const $limit = domain.createStore(optLimit)
  const $offset = domain.createStore(0)
  const $totalElements = domain.createStore(0)

  const changeOffset = domain.createEvent<number>()
  const totalElements = domain.createEvent<number>()
  const reset = domain.createEvent()

  $offset.on(changeOffset, (_, payload) => payload)
  $totalElements.on(totalElements, (_, payload) => payload)

  $limit.reset(reset)
  $offset.reset(reset)
  $totalElements.reset(reset)

  const loadMore = domain.createEvent()

  const $hasNextPage = combine(
    optItems,
    $totalElements,
    (items, total) => total > items.length
  )

  const useScroll = () => {
    const loading = useStore(optLoading)
    const hasNextPage = useStore($hasNextPage)

    return useInfiniteScroll({
      rootMargin,
      onLoadMore: loadMore,
      loading,
      hasNextPage,
      ...rest,
    })
  }

  sample({
    source: [$offset, $limit],
    clock: loadMore,
    fn: ([offset, limit]) => offset + limit,
    target: changeOffset,
  })

  useScroll.state = combine($limit, $offset, (limit, offset) => ({
    limit,
    offset,
  }))
  useScroll.updates = useScroll.state.updates
  useScroll.totalElements = totalElements
  useScroll.reset = reset
  useScroll.hasNextPage = $hasNextPage
  useScroll.offset = $offset

  return useScroll
}
