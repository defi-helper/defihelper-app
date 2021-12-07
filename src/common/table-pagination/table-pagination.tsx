import clsx from 'clsx'

import { ButtonBase } from '~/common/button-base'
import { Icon } from '~/common/icon'
import { Typography } from '~/common/typography'
import * as styles from './table-pagination.css'

export type TablePaginationProps = {
  rowsPerPage: number
  count: number
  className?: string
  onChange: (page: number) => void
  value: number
}

const defaultLabelDisplayedRows = (from: number, to: number, count: number) => {
  return `${from}-${to} of ${count !== -1 ? count : `more than ${to}`}`
}

const getLabelDisplayedRowsTo = (
  count: number,
  page: number,
  rowsPerPage: number
) => {
  if (count === -1) {
    return (page + 1) * rowsPerPage
  }
  return rowsPerPage === -1 ? count : Math.min(count, (page + 1) * rowsPerPage)
}

export const TablePagination: React.VFC<TablePaginationProps> = (props) => {
  const handlePrev = () => {
    props.onChange(props.value - 1)
  }

  const handleNext = () => {
    props.onChange(props.value + 1)
  }

  return (
    <div className={clsx(styles.pagination, props.className)}>
      <Typography variant="body2" as="span" className={styles.paginationCount}>
        {defaultLabelDisplayedRows(
          props.count === 0 ? 0 : props.value * props.rowsPerPage + 1,
          getLabelDisplayedRowsTo(props.count, props.value, props.rowsPerPage),
          props.count === -1 ? -1 : props.count
        )}
      </Typography>
      <ButtonBase
        className={styles.paginationButton}
        onClick={handlePrev}
        disabled={props.value === 0}
      >
        <Icon icon="arrowLeft" width="16" />
      </ButtonBase>
      <ButtonBase
        className={styles.paginationButton}
        onClick={handleNext}
        disabled={
          props.count !== -1
            ? props.value >= Math.ceil(props.count / props.rowsPerPage) - 1
            : false
        }
      >
        <Icon icon="arrowRight" width="16" />
      </ButtonBase>
    </div>
  )
}
