/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from 'clsx'
import {
  Children,
  isValidElement,
  useState,
  createContext,
  useContext,
  cloneElement,
  useEffect,
} from 'react'

import * as styles from './autostaking-tabs.css'

const TabContext = createContext<{
  currentTab: number
  onChangeTab: (tabIndex: number) => void
} | null>(null)

export type AutostakingTabsProps = {
  className?: string
  children?: React.ReactNode
  onChange?: (currentTabIndex: number) => void
  value?: number
}

const HeaderRight: React.FC<unknown> = (props) => <>{props.children}</>

const Header = (props: AutostakingTabsProps) => {
  const context = useContext(TabContext)

  if (!context) throw new Error('TabContext is null')

  const children = Children.toArray(props.children).filter(isValidElement)

  const headerRight = children.find((child) => child.type === HeaderRight)
  const restChildren = children.filter((child) => child.type !== HeaderRight)

  return (
    <div className={clsx(styles.tabHeader, props.className)}>
      {Children.map(restChildren, (child: React.ReactElement<any>, index) =>
        cloneElement(child, {
          ...child.props,
          className: clsx(child.props.className, styles.tab, {
            [styles.tabActive]: index === context.currentTab,
          }),
          onClick: context.onChangeTab.bind(null, index),
        })
      )}
      {headerRight && cloneElement(headerRight)}
    </div>
  )
}

export const AutostakingTabs = (props: AutostakingTabsProps) => {
  const [currentTab, setCurrentTab] = useState(props.value ?? 0)

  const children = Children.toArray(props.children).filter(isValidElement)

  const header = children.find((child) => child.type === Header)

  const restChildren = children.filter((child) => child.type !== Header)

  const handleChangeTab = (tabIndex: number) => {
    setCurrentTab(tabIndex)
  }

  useEffect(() => {
    props.onChange?.(currentTab)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTab])

  return (
    <TabContext.Provider
      value={{
        currentTab,
        onChangeTab: handleChangeTab,
      }}
    >
      <div className={clsx(styles.root, props.className)}>
        {header}
        <div className={styles.tabBody}>{restChildren[currentTab]}</div>
      </div>
    </TabContext.Provider>
  )
}

AutostakingTabs.Header = Header
AutostakingTabs.HeaderRight = HeaderRight
