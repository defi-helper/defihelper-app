import { Event, Store } from 'effector'
import { useStore } from 'effector-react'
import { useEffect, useState } from 'react'
import { useUpdateEffect } from 'react-use'
import { generate } from '@bramus/pagination-sequence'
import clsx from 'clsx'

import { ButtonBase } from '~/common/button-base'
import { Icon } from '~/common/icon'
import * as styles from './pagination.css'

export type PaginationProps = {
  $pages: Store<number>
  changePage: Event<number>
  reset: Event<void>
  className?: string
}

const DEFAULT_PAGE = 1

export const Pagination: React.VFC<PaginationProps> = (props) => {
  const pages = useStore(props.$pages)

  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE)

  const items = generate(currentPage, pages || 1)

  useUpdateEffect(() => {
    props.changePage(currentPage - 1)
  }, [currentPage])

  useEffect(() => {
    return () => {
      props.reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChangePage = (page: number) => () => {
    setCurrentPage(page)
  }

  const handleNext = () => {
    setCurrentPage(currentPage + 1)
  }

  const handlePrev = () => {
    setCurrentPage(currentPage - 1)
  }

  if (!pages || pages <= 1) return <></>

  return (
    <div className={clsx(styles.root, props.className)}>
      <ButtonBase
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={styles.item}
      >
        <Icon icon="arrowLeft" width="1em" height="1em" />
      </ButtonBase>
      {items.map((item, index) =>
        typeof item === 'string' ? (
          <span key={String(index)} className={styles.item}>
            {item}
          </span>
        ) : (
          <ButtonBase
            key={String(index)}
            onClick={handleChangePage(item)}
            className={styles.item}
            disabled={currentPage === item}
          >
            {item}
          </ButtonBase>
        )
      )}
      <ButtonBase
        onClick={handleNext}
        disabled={currentPage >= pages}
        className={styles.item}
      >
        <Icon icon="arrowRight" width="1em" height="1em" />
      </ButtonBase>
    </div>
  )
}
