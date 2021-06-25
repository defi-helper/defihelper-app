import { AbilityBuilder, Ability, AbilityClass } from '@casl/ability'
import { createContext } from 'react'
import { createContextualCan } from '@casl/react'

import { ProtocolType } from '~/graphql/_generated-types'

type Actions = 'create' | 'read' | 'update' | 'delete'
type Subjects = ProtocolType | 'Protocol' | 'all'

export type AppAbilityType = Ability<[Actions, Subjects]>
export const AppAbility = Ability as AbilityClass<AppAbilityType>

export function defineRulesFor(role?: string) {
  const { can, rules } = new AbilityBuilder(AppAbility)

  if (role === 'admin') {
    can(['create', 'delete', 'read', 'update'], 'all')
  } else {
    can(['read'], 'Protocol')
  }

  return rules
}

export const buildAbilityFor = (role?: string): AppAbilityType => {
  return new AppAbility(defineRulesFor(role))
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const AbilityContext = createContext<AppAbilityType>(undefined!)

AbilityContext.displayName = 'AbilityContext'

export const Can = createContextualCan(AbilityContext.Consumer)
