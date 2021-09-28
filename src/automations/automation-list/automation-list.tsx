import { useGate, useStore } from 'effector-react'
import isEmpty from 'lodash.isempty'
import { Link as ReactRouterLink } from 'react-router-dom'

import { AppLayout } from '~/layouts/app-layout'
import { Typography } from '~/common/typography'
import { Button } from '~/common/button'
import { paths } from '~/paths'
import { useDialog } from '~/common/dialog'
import { AutomationUpdate } from '../automation-update'
import { Trigger } from '../common/automation.types'
import * as styles from './automation-list.css'
import * as model from './automation-list.model'

export type AutomationListProps = unknown

export const AutomationList: React.VFC<AutomationListProps> = () => {
  const triggers = useStore(model.$triggers)
  const loading = useStore(model.fetchTriggersFx.pending)
  const contracts = useStore(model.$contracts)

  const [openAutomationUpdate] = useDialog(AutomationUpdate)

  const handleDeleteTrigger = (triggerId: string) => () =>
    model.deleteTriggerFx(triggerId)

  const handleEditTrigger = (trigger: Trigger) => async () => {
    await openAutomationUpdate({
      trigger,
      contracts,
      onAddContract: model.setNewContract,
    }).catch((error: Error) => console.error(error.message))
  }

  useGate(model.AutomationListGate)

  return (
    <AppLayout>
      <div className={styles.root}>
        <Button as={ReactRouterLink} to={paths.automations.create}>
          Create automation
        </Button>
        {loading && <Typography>loading...</Typography>}
        {!loading && isEmpty(triggers) && <Typography>empty</Typography>}
        {!loading &&
          !isEmpty(triggers) &&
          triggers.map((trigger) => (
            <div key={trigger.id}>
              <Typography>{trigger.name}</Typography>
              <Typography>
                last call at:{' '}
                {trigger.lastCallAt ? trigger.lastCallAt : 'never'}
              </Typography>
              <Typography>active: {String(trigger.active)}</Typography>
              <Typography>type: {trigger.type}</Typography>
              <Button onClick={handleEditTrigger(trigger)}>Edit</Button>
              <Button
                onClick={handleDeleteTrigger(trigger.id)}
                loading={trigger.deleting}
              >
                Delete
              </Button>
            </div>
          ))}
        {contracts.map((contract) => (
          <div key={contract.id}>
            <Typography>{contract.adapter}</Typography>
            <Typography>{contract.rejectReason}</Typography>
            <Typography>{contract.verification}</Typography>
            <Typography>{contract.address}</Typography>
          </div>
        ))}
      </div>
    </AppLayout>
  )
}
