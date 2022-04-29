import { createDomain, sample } from 'effector-logger/macro'
import { createGate } from 'effector-react'
import { automationApi } from '~/automations/common/automation.api'
import { AutomateRunHistoryFilterEnum } from '~/graphql/_generated-types'
import { protocolsApi } from '~/protocols/common'
import { usersApi } from '~/users/common/users.api'

const monitoringDomain = createDomain()

export const fetchAutomationsSuccessfulRunsHistoryFx =
  monitoringDomain.createEffect(() => {
    return automationApi.getAutomationsRunsHistory({
      filter: AutomateRunHistoryFilterEnum.OnlySuccessful,
    })
  })

export const fetchDfhProtocolEarningsHistoryFx = monitoringDomain.createEffect(
  async (network: string) => {
    return {
      points: await protocolsApi.dfhProtocolEarningHistory({ network }),
      network,
    }
  }
)

export const fetchAutomationsFailedRunsHistoryFx =
  monitoringDomain.createEffect(() => {
    return automationApi.getAutomationsRunsHistory({
      filter: AutomateRunHistoryFilterEnum.OnlyFailed,
    })
  })

export const fetchUsersRegisteringHistoryFx = monitoringDomain.createEffect(
  () => {
    return usersApi.getUsersRegisteringHistory({})
  }
)

export const fetchAutomationsCreationHistoryFx = monitoringDomain.createEffect(
  () => {
    return automationApi.getAutomationsCreationHistory()
  }
)

export const fetchAutomationsAutorestakeCreationHistoryFx =
  monitoringDomain.createEffect(() => {
    return automationApi.getAutomationsAutorestakeCreationHistory()
  })

export const $usersRegisteringHistory = monitoringDomain
  .createStore<{ date: string; number: number }[]>([])
  .on(fetchUsersRegisteringHistoryFx.doneData, (_, payload) => payload)

export const $automationsCreationHistory = monitoringDomain
  .createStore<{ date: string; number: number }[]>([])
  .on(fetchAutomationsCreationHistoryFx.doneData, (_, payload) => payload)

export const $automationsSuccessfulRunsHistory = monitoringDomain
  .createStore<{ date: string; number: number }[]>([])
  .on(
    fetchAutomationsSuccessfulRunsHistoryFx.doneData,
    (_, payload) => payload.list
  )

export const $automationsFailedRunsHistory = monitoringDomain
  .createStore<{ date: string; number: number }[]>([])
  .on(
    fetchAutomationsFailedRunsHistoryFx.doneData,
    (_, payload) => payload.list
  )

export const $automationsAutorestakeCreationHistory = monitoringDomain
  .createStore<{ date: string; number: number }[]>([])
  .on(
    fetchAutomationsAutorestakeCreationHistoryFx.doneData,
    (_, payload) => payload
  )

export const $dfhEarningsHistory = monitoringDomain
  .createStore<{ [network: string]: { date: string; number: number }[] }>({})
  .on(fetchDfhProtocolEarningsHistoryFx.doneData, (state, payload) => {
    return {
      ...state,
      [payload.network]: payload.points ?? [],
    }
  })

export const MonitoringGate = createGate({
  domain: monitoringDomain,
  name: 'MonitoringGate',
})

sample({
  clock: MonitoringGate.open,
  target: [
    fetchUsersRegisteringHistoryFx,
    fetchAutomationsCreationHistoryFx,
    fetchAutomationsAutorestakeCreationHistoryFx,
    fetchAutomationsSuccessfulRunsHistoryFx,
    fetchAutomationsFailedRunsHistoryFx,
  ],
})
