/* eslint-disable react/require-default-props */
import { combine, Domain, sample } from 'effector'
import { createElement } from 'react'

import { Pagination } from './pagination'

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
  const $pages = options.domain.createStore<number>(0)

  const changePage = options.domain.createEvent<number>()
  const changeOffset = options.domain.createEvent<number>()
  const totalPages = options.domain.createEvent<number>()
  const totalElements = options.domain.createEvent<number>()
  const reset = options.domain.createEvent()

  sample({
    source: $limit,
    clock: changePage,
    fn: (source, clock) => clock * source,
    target: changeOffset,
  })

  $offset.on(changeOffset, (_, payload) => payload)
  $pages.on(totalPages, (_, payload) => payload)
  $offset.reset(reset)
  $pages.reset(reset)

  sample({
    source: $limit,
    clock: totalElements,
    fn: (limit, total) => Math.ceil(total / limit),
    target: totalPages,
  })

  const Component = (props: { className?: string }) =>
    createElement(Pagination, {
      $pages,
      changePage,
      reset,
      className: props.className,
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
  Component.reset = reset

  return Component
}
