import clsx from 'clsx'
import { useStore } from 'effector-react'
import { useState } from 'react'

import { AutomationDialog } from '~/automations/common/automation-dialog'
import {
  AutomationSelectList,
  AutomationSelectListItem,
} from '~/automations/common/automation-select-list'
import { Automates } from '~/automations/common/automation.types'
import { ButtonBase } from '~/common/button-base'
import { userModel } from '~/users'
import { AutomationTriggerForm } from '../common/automation-trigger-form'
import * as styles from './automation-trigger-dialog.css'

export type AutomationTriggerDialogProps = {
  automateContracts: Record<string, Automates>
}

type Types = 'ByTime' | 'ByEvent'

enum Tabs {
  Trigger = 'trigger',
  Conditions = 'conditions',
  Actions = 'actions',
}

export const AutomationTriggerDialog: React.VFC<AutomationTriggerDialogProps> =
  (props) => {
    const wallets = useStore(userModel.$userWallets)
    const [currentType, setType] = useState<Types | null>(null)
    const [currentTab, setTab] = useState<Tabs>(Tabs.Trigger)

    const handleSetType = (type: Types | null) => () => {
      setType(type)
    }

    const handleChangeTab = (tab: Tabs) => () => {
      setTab(tab)
    }

    return (
      <AutomationDialog
        title={
          !currentType ? (
            'Choose type'
          ) : (
            <div className={styles.tabs}>
              {Object.entries(Tabs).map(([key, value]) => (
                <ButtonBase
                  key={key}
                  className={clsx(styles.tab, {
                    [styles.filledTab]: false,
                    [styles.activeTab]: currentTab === value,
                    [styles.disableTab]: true && currentTab !== value,
                  })}
                  onClick={handleChangeTab(value)}
                >
                  {key}
                </ButtonBase>
              ))}
            </div>
          )
        }
      >
        {!currentType ? (
          <AutomationSelectList>
            <AutomationSelectListItem onClick={handleSetType('ByTime')}>
              By time
            </AutomationSelectListItem>
            <AutomationSelectListItem onClick={handleSetType('ByEvent')}>
              By event
            </AutomationSelectListItem>
          </AutomationSelectList>
        ) : (
          <>
            {currentTab === Tabs.Trigger && (
              <AutomationTriggerForm
                wallets={wallets}
                automateContracts={props.automateContracts}
                type={currentType}
              />
            )}
          </>
        )}
      </AutomationDialog>
    )
  }
