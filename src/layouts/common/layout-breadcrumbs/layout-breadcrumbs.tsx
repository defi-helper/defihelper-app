import clsx from 'clsx'
import React, { Fragment, Children, isValidElement } from 'react'
import { useRouteMatch, Link as ReactRouterLink } from 'react-router-dom'

import { Link } from '~/common/link'
import { paths } from '~/paths'
import * as styles from './layout-breadcrumbs.css'

export type LayoutBreadcrumbsProps = {
  className?: string
}

const pathsMap: Record<string, string> = {
  [paths.automations.list]: 'Automations',
  [paths.automations.history()]: 'History',
  [paths.governance.list]: 'Governance',
  [paths.governance.detail()]: ':id',
  [paths.governance.create]: 'Create proposal',
  [paths.protocols.list]: 'Protocols',
  [paths.protocols.detail()]: ':id',
  [paths.protocols.detailReadonly()]: ':id',
  [paths.roadmap.list]: 'Vote',
  [paths.roadmap.detail()]: ':id',
}

export const LayoutBreadcrumbs: React.FC<LayoutBreadcrumbsProps> = (props) => {
  const match = useRouteMatch()

  const children = Children.toArray(props.children)
    .map((child) => {
      if (typeof child === 'string') return child

      if (isValidElement(child))
        return child.props.children.filter(
          (subChild: React.ReactNode) => typeof subChild === 'string'
        )

      return child
    })
    .flat()[0]

  const pathsNames = match.path.split('/').filter(Boolean)
  const pathUrls = pathsNames
    .map((_, index) => {
      const to = `/${pathsNames.slice(0, index + 1).join('/')}`

      return to
    })
    .map((path) => ({
      title: pathsMap[path],
      path,
    }))
    .filter(({ title }) => Boolean(title))
    .map(({ title, path }) => ({
      title: title === ':id' ? children : title,
      path,
    }))

  if (pathUrls.length <= 1) return <></>

  return (
    <ul className={clsx(styles.root, props.className)}>
      {pathUrls.map(({ path, title }, index) => {
        const last = index === pathUrls.length - 1

        const hasBreadCrumbs = index < pathUrls.length - 1

        return last ? (
          <li key={path} className={styles.last}>
            {title}
          </li>
        ) : (
          <Fragment key={path}>
            <li>
              <Link as={ReactRouterLink} to={path}>
                {title}
              </Link>
            </li>
            {hasBreadCrumbs && <li className={styles.separator}>/</li>}
          </Fragment>
        )
      })}
    </ul>
  )
}
