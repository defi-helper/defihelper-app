import React from 'react'
import { NavLink } from 'react-router-dom'
import { Icon } from '~/common/icon'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { AppLayout } from '~/layouts'
import { Head } from '~/common/head'
import * as styles from './admin.css'
import { paths } from '~/paths'

export type BridgesProps = unknown

const PAGES = [
  {
    title: 'Monitoring',
    link: paths.monitoring,
    icon: <Icon icon="calculator" />,
  },
  {
    title: 'Tokens',
    link: paths.tokens,
    icon: <Icon icon="grid" />,
  },
  {
    title: 'Users',
    link: paths.users,
    icon: <Icon icon="grid" />,
  },
]

export const Admin: React.VFC<BridgesProps> = () => {
  return (
    <AppLayout title="Bridges">
      <Head title="Bridges" />
      <div className={styles.header}>
        <Typography variant="h3">Admin</Typography>
      </div>
      <ul className={styles.list}>
        {PAGES.map((page) => (
          <li key={page.title}>
            <Paper
              radius={8}
              as={NavLink}
              to={page.link}
              className={styles.card}
            >
              {React.cloneElement(page.icon, {
                height: 16,
                width: 16,
              })}
              <Typography variant="body2">{page.title}</Typography>
              <Icon
                icon="arrowRight"
                width="24"
                height="24"
                className={styles.cardLinkIcon}
              />
            </Paper>
          </li>
        ))}
      </ul>
    </AppLayout>
  )
}
