import { useGate, useStore } from 'effector-react'

import { AppLayout } from '~/layouts'
import { ButtonBase } from '~/common/button-base'
import { useDialog } from '~/common/dialog'
import { UserRoleDialog } from './common/user-role-dialog/user-role-dialog'
import { UserRoleEnum } from '~/graphql/_generated-types'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import * as model from './users.model'
import * as styles from './users.css'

export type UsersProps = unknown

export const Users: React.VFC<UsersProps> = () => {
  const users = useStore(model.$users)

  const [openRoleDialog] = useDialog(UserRoleDialog)

  useGate(model.UsersGate)

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
            </div>
          ))}
        </Paper>
      </div>
    </AppLayout>
  )
}
