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
  const $limit = options.domain.createStore(options.limit ?? DEFAULT_LIMIT)
  const $offset = options.domain.createStore(0)
  const $pages = options.domain.createStore<number | null>(null)

  const changePage = options.domain.createEvent<number>()
  const changeOffset = options.domain.createEvent<number>()
  const totalPages = options.domain.createEvent<number>()
  const totalElements = options.domain.createEvent<number>()

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
    (limit, offset): PaginationState => ({
      limit,
      offset,
    })
  )
  Component.totalElements = totalElements
  Component.updates = Component.state.updates

  return Component
}
