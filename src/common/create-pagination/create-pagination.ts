import { combine, Domain, sample } from 'effector-logger/macro'
import { createElement } from 'react'

import { Pagination } from './component'

export type PaginationState = {
  limit: number
  offset?: number
}

type Options = {
  domain: Domain
  limit?: number
}

const DEFAULT_LIMIT = 10

export const createPagination = (options: Options) => {
  const $limit = options.domain.createStore(options.limit ?? DEFAULT_LIMIT, {
    name: '$limit',
  })
  const $offset = options.domain.createStore(0, {
    name: '$offset',
  })

  const $pages = options.domain.createStore<number | null>(null, {
    name: '$pages',
  })

  const changePage = options.domain.createEvent<number>('changePage')
  const changeOffset = options.domain.createEvent<number>('changeOffset')
  const totalPages = options.domain.createEvent<number>('totalPages')
  const totalElements = options.domain.createEvent<number>('totalElements')

  sample({
    source: $limit,
    clock: changePage,
    fn: (source, clock) => clock * source,
    target: changeOffset,
  })

  $offset.on(changeOffset, (_, payload) => payload)
  $pages.on(totalPages, (_, payload) => payload)

  sample({
    source: $limit,
    clock: totalElements,
    fn: (limit, total) => Math.ceil(total / limit),
    target: totalPages,
  })

  const Component = () =>
    createElement(Pagination, {
      $pages,
      changePage,
    })

  Component.state = combine(
    $limit,
    $offset,
    (limit, offset) =>
      ({
        limit,
        offset,
      } as PaginationState)
  )
  Component.totalElements = totalElements
  Component.updates = Component.state.updates

  return Component
}
