import { AbilityBuilder, Ability, AbilityClass } from '@casl/ability'
import { createContext } from 'react'
import { createContextualCan, useAbility as useCaslAbility } from '@casl/react'

import {
  ProtocolFragmentFragment,
  StakingContractFragmentFragment
} from '~/graphql/_generated-types'

export type Actions = 'create' | 'read' | 'update' | 'delete'
export type Subjects =
  | ProtocolFragmentFragment
  | StakingContractFragmentFragment
  | 'Protocol'
  | 'Contract'
  | 'all'

export type AppAbilityType = Ability<[Actions, Subjects]>
export const AppAbility = Ability as AbilityClass<AppAbilityType>

export const defineRulesFor = (role?: string) => {
  const { can, rules } = new AbilityBuilder(AppAbility)

  if (role === 'admin') {
    can(['create', 'delete', 'read', 'update'], 'all')
  } else {
    can(['read'], ['Contract', 'Protocol'], {
      hidden: false
    })
  }

  return rules
}

export const buildAbilityFor = (role?: string): AppAbilityType => {
  return new AppAbility(defineRulesFor(role), {
    detectSubjectType: (object) => {
      if ('network' in object) return 'Contract'

      if ('hidden' in object) return 'Protocol'

      return 'all'
    }
  })
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const AbilityContext = createContext<AppAbilityType>(undefined!)

AbilityContext.displayName = 'AbilityContext'

export const Can = createContextualCan(AbilityContext.Consumer)

export const useAbility = () => useCaslAbility(AbilityContext)
