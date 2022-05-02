import { getAPIClient } from '~/api'
import { config } from '~/config'
import {
  AutomationActionCreateMutation,
  AutomationActionCreateMutationVariables,
  AutomationActionDeleteMutation,
  AutomationActionDeleteMutationVariables,
  AutomationActionUpdateMutation,
  AutomationActionUpdateMutationVariables,
  AutomationConditionCreateMutation,
  AutomationConditionCreateMutationVariables,
  AutomationConditionDeleteMutation,
  AutomationConditionDeleteMutationVariables,
  AutomationConditionUpdateMutation,
  AutomationConditionUpdateMutationVariables,
  AutomationHistoryQuery,
  AutomationHistoryQueryVariables,
  AutomationTriggerCreateMutation,
  AutomationTriggerCreateMutationVariables,
  AutomationTriggerDeleteMutation,
  AutomationTriggerDeleteMutationVariables,
  AutomationTriggerQuery,
  AutomationTriggerQueryVariables,
  AutomationTriggersQuery,
  AutomationTriggersQueryVariables,
  AutomationTriggerUpdateMutation,
  AutomationTriggerUpdateMutationVariables,
  AutomationProtocolsQueryVariables,
  AutomationProtocolsQuery,
  AutomationDescriptionQuery,
  AutomationProductsQuery,
  AutomationProductsQueryVariables,
  AutomationProductsBalanceQuery,
  AutomationProductsBalanceQueryVariables,
} from '~/api/_generated-types'
import { Automates } from './automation.types'
import {
  AUTOMATION_ACTION_CREATE,
  AUTOMATION_ACTION_DELETE,
  AUTOMATION_ACTION_UPDATE,
  AUTOMATION_CONDITION_CREATE,
  AUTOMATION_CONDITION_DELETE,
  AUTOMATION_CONDITION_UPDATE,
  AUTOMATION_HISTORY,
  AUTOMATION_TRIGGER,
  AUTOMATION_TRIGGERS,
  AUTOMATION_TRIGGER_CREATE,
  AUTOMATION_TRIGGER_DELETE,
  AUTOMATION_TRIGGER_UPDATE,
  AUTOMATION_PROTOCOLS,
  AUTOMATION_DESCRIPTION,
  AUTOMATION_PRODUCTS,
  AUTOMATION_PRODUCTS_BALANCE,
} from './graphql'

export const automationApi = {
  getTriggers: (variables: AutomationTriggersQueryVariables) =>
    getAPIClient()
      .request<
        AutomationTriggersQuery,
        unknown,
        AutomationTriggersQueryVariables
      >({
        query: AUTOMATION_TRIGGERS.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => ({
        list: data?.automateTriggers.list ?? [],
        count: data?.automateTriggers.pagination.count ?? 0,
      })),

  getTrigger: (variables: AutomationTriggerQueryVariables) =>
    getAPIClient()
      .request<
        AutomationTriggerQuery,
        unknown,
        AutomationTriggerQueryVariables
      >({
        query: AUTOMATION_TRIGGER.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.automateTrigger),

  createTrigger: (variables: AutomationTriggerCreateMutationVariables) =>
    getAPIClient()
      .request<
        AutomationTriggerCreateMutation,
        unknown,
        AutomationTriggerCreateMutationVariables
      >({
        query: AUTOMATION_TRIGGER_CREATE.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.automateTriggerCreate),

  updateTrigger: (variables: AutomationTriggerUpdateMutationVariables) =>
    getAPIClient()
      .request<
        AutomationTriggerUpdateMutation,
        unknown,
        AutomationTriggerUpdateMutationVariables
      >({
        query: AUTOMATION_TRIGGER_UPDATE.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.automateTriggerUpdate),

  deleteTrigger: (variables: AutomationTriggerDeleteMutationVariables) =>
    getAPIClient()
      .request<
        AutomationTriggerDeleteMutation,
        unknown,
        AutomationTriggerDeleteMutationVariables
      >({
        query: AUTOMATION_TRIGGER_DELETE.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.automateTriggerDelete),

  createCondition: (variables: AutomationConditionCreateMutationVariables) =>
    getAPIClient()
      .request<
        AutomationConditionCreateMutation,
        unknown,
        AutomationConditionCreateMutationVariables
      >({
        query: AUTOMATION_CONDITION_CREATE.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.automateConditionCreate),

  updateCondition: (variables: AutomationConditionUpdateMutationVariables) =>
    getAPIClient()
      .request<
        AutomationConditionUpdateMutation,
        unknown,
        AutomationConditionUpdateMutationVariables
      >({
        query: AUTOMATION_CONDITION_UPDATE.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.automateConditionUpdate),

  deleteCondition: (variables: AutomationConditionDeleteMutationVariables) =>
    getAPIClient()
      .request<
        AutomationConditionDeleteMutation,
        unknown,
        AutomationConditionDeleteMutationVariables
      >({
        query: AUTOMATION_CONDITION_DELETE.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.automateConditionDelete),

  createAction: (variables: AutomationActionCreateMutationVariables) =>
    getAPIClient()
      .request<
        AutomationActionCreateMutation,
        unknown,
        AutomationActionCreateMutationVariables
      >({
        query: AUTOMATION_ACTION_CREATE.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.automateActionCreate),

  updateAction: (variables: AutomationActionUpdateMutationVariables) =>
    getAPIClient()
      .request<
        AutomationActionUpdateMutation,
        unknown,
        AutomationActionUpdateMutationVariables
      >({
        query: AUTOMATION_ACTION_UPDATE.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.automateActionUpdate),

  deleteAction: (variables: AutomationActionDeleteMutationVariables) =>
    getAPIClient()
      .request<
        AutomationActionDeleteMutation,
        unknown,
        AutomationActionDeleteMutationVariables
      >({
        query: AUTOMATION_ACTION_DELETE.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.automateActionDelete),

  getAutomationsContracts: (
    network = 'ethereum'
  ): Promise<Omit<Automates, 'contractInterface'>[]> =>
    fetch(`${config.ADAPTERS_HOST}/automates/${network}`).then((res) =>
      res.json()
    ),

  getContractAddress: (
    variables: Omit<Automates, 'contractInterface'> & {
      chainId: string
    }
  ) =>
    fetch(
      `${config.ADAPTERS_HOST}/automates/ethereum/${variables.protocol}/${variables.contract}/${variables.chainId}`
    )
      .then((res) => res.json())
      .then((res) => ({
        address: res.address as string | undefined,
      })),

  getHistory: (variables: AutomationHistoryQueryVariables) =>
    getAPIClient()
      .request<
        AutomationHistoryQuery,
        unknown,
        AutomationHistoryQueryVariables
      >({
        query: AUTOMATION_HISTORY.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => ({
        list: data?.automateTrigger?.callHistory.list ?? [],
        count: data?.automateTrigger?.callHistory.pagination.count ?? 0,
      })),

  getProtocols: (variables: AutomationProtocolsQueryVariables) =>
    getAPIClient()
      .request<
        AutomationProtocolsQuery,
        unknown,
        AutomationProtocolsQueryVariables
      >({
        query: AUTOMATION_PROTOCOLS.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.protocols.list ?? []),

  getDescription: () =>
    getAPIClient()
      .request<AutomationDescriptionQuery, unknown, AutomationDescriptionQuery>(
        {
          query: AUTOMATION_DESCRIPTION.loc?.source.body ?? '',
        }
      )
      .then(({ data }) => data?.automateDescription),

  getProducts: (variables?: AutomationProductsQueryVariables) =>
    getAPIClient()
      .request<
        AutomationProductsQuery,
        unknown,
        AutomationProductsQueryVariables
      >({
        query: AUTOMATION_PRODUCTS.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => ({
        list: data?.products.list ?? [],
      })),

  getBalance: (variables?: AutomationProductsBalanceQueryVariables) =>
    getAPIClient()
      .request<
        AutomationProductsBalanceQuery,
        unknown,
        AutomationProductsBalanceQueryVariables
      >({
        query: AUTOMATION_PRODUCTS_BALANCE.loc?.source.body ?? '',
        variables,
      })
      .then(({ data }) => data?.me?.store.balance.notifications ?? 0),
}
