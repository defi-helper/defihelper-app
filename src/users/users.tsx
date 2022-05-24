import { useEffect, useState } from 'react'
import { useStore } from 'effector-react'

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
import { Input } from '~/common/input'

export type UsersProps = unknown

const ROWS_PER_PAGE = 30

export const Users: React.VFC<UsersProps> = () => {
  const users = useStore(model.$users)
  const count = useStore(model.$count)

  const [openRoleDialog] = useDialog(UserRoleDialog)
  const [page, setPages] = useState(0)
  const [search, setSearch] = useState<string | undefined>(undefined)

  useEffect(() => {
    model.fetchUsersFx({
      pagination: {
        limit: ROWS_PER_PAGE,
        offset: page * ROWS_PER_PAGE,
      },
      search,
    })
  }, [search, page])

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

  const handleLoginAsUser = (user: typeof users[number]) => async () => {
    try {
      await model.loginByUserFx(user)
      window.location.reload()
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  return (
    <AppLayout>
      <div className={styles.tableWrap}>
        <Input
          type="text"
          label="Search"
          onChange={(e) => setSearch(e.target.value)}
          className={styles.search}
        />

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
                {user.role}
                {' · '}
                {user.role !== UserRoleEnum.Admin && (
                  <>
                    <ButtonBase
                      className={styles.adminActionButton}
                      onClick={handleChangeRole(user)}
                    >
                      Edit
                    </ButtonBase>
                    <ButtonBase
                      className={styles.adminActionButton}
                      onClick={handleLoginAsUser(user)}
                    >
                      Login
                    </ButtonBase>
                  </>
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
