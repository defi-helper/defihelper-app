import { Event, Store } from 'effector'
import { useStore } from 'effector-react'
import { useEffect, useState } from 'react'
import { useUpdateEffect } from 'react-use'
import { generate } from '@bramus/pagination-sequence'

import { ButtonBase } from '../button-base'
import { Icon } from '../icon'
import * as styles from './pagination.css'

export type PaginationProps = {
  $pages: Store<number>
  changePage: Event<number>
}

const DEFAULT_PAGE = 1

export const Pagination: React.VFC<PaginationProps> = (props) => {
  const pages = useStore(props.$pages)

  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE)

  const items = generate(currentPage, pages)

  useUpdateEffect(() => {
    props.changePage(currentPage - 1)
  }, [currentPage])

  useEffect(() => {
    return () => {
      props.changePage(DEFAULT_PAGE - 1)
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
    <div className={styles.root}>
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
            key={item}
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
