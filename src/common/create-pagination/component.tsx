import MaterialPagination from '@material-ui/lab/Pagination'
import { Event, Store } from 'effector'
import { useStore } from 'effector-react'

export type PaginationProps = {
  $pages: Store<number | null>
  changePage: Event<number>
}

export const Pagination: React.VFC<PaginationProps> = (props) => {
  const pages = useStore(props.$pages)

  const handleChangePage = (_: unknown, page: number) => {
    props.changePage(page - 1)
  }

  return (
    <MaterialPagination
      count={pages ?? undefined}
      onChange={handleChangePage}
    />
  )
}
