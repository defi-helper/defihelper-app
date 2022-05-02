import { useState } from 'react'
import { useGate, useStore } from 'effector-react'

import { AppLayout } from '~/layouts'
import { ButtonBase } from '~/common/button-base'
import { useDialog } from '~/common/dialog'
import { UserRoleDialog } from './common/user-role-dialog/user-role-dialog'
import { UserRoleEnum } from '~/api/_generated-types'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { TablePagination } from '~/common/table-pagination'
import * as model from './users.model'
import * as styles from './users.css'

export type UsersProps = unknown

const ROWS_PER_PAGE = 10

export const Users: React.VFC<UsersProps> = () => {
  const users = useStore(model.$users)

  const [openRoleDialog] = useDialog(UserRoleDialog)

  const [page, setPages] = useState(0)

  const count = useStore(model.$count)

  useGate(model.UsersGate, {
    limit: ROWS_PER_PAGE,
    offset: page * ROWS_PER_PAGE,
  })

  const handleChangeRole = (user: typeof users[number]) => async () => {
    try {
      const role = await openRoleDialog({
        defaultValues: {
          role: user.role,
        },
      })

      model.updateUserFx({
        ...user,
        role,
      })
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  return (
    <AppLayout>
      <div className={styles.tableWrap}>
        <Paper radius={8} className={styles.table}>
          <div className={styles.tableHeader}>
            <Typography variant="body3">id</Typography>
            <Typography variant="body3">role</Typography>
            <Typography variant="body3">created at</Typography>
            <TablePagination
              count={count}
              rowsPerPage={ROWS_PER_PAGE}
              onChange={setPages}
              value={page}
              className={styles.pagination}
            />
          </div>
          {users.map((user) => (
            <div key={user.id} className={styles.tableRow}>
              <Typography variant="body3">{user.id}</Typography>
              <Typography variant="body3">
                {user.role}{' '}
                {user.role !== UserRoleEnum.Admin && (
                  <ButtonBase onClick={handleChangeRole(user)}>Edit</ButtonBase>
                )}
              </Typography>
              <Typography variant="body3">{user.createdAt}</Typography>
            </div>
          ))}
        </Paper>
      </div>
    </AppLayout>
  )
}
