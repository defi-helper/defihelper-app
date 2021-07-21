import { AbilityBuilder, Ability, AbilityClass } from '@casl/ability'
import { createContext } from 'react'
import { createContextualCan, useAbility as useCaslAbility } from '@casl/react'

type Entities =
  | 'Dashboard'
  | 'AllNetworks'
  | 'Networks'
  | 'Protocol'
  | 'Contract'
  | 'all'
  | 'Proposal'
  | 'UserContact'

export type Actions = 'create' | 'read' | 'update' | 'delete'
export type Subjects = Entities | { type: Entities }

export type AppAbilityType = Ability<[Actions, Subjects]>
export const AppAbility = Ability as AbilityClass<AppAbilityType>

export const defineRulesFor = (role?: string) => {
  const { can, rules } = new AbilityBuilder(AppAbility)

  if (role === 'admin') {
    can(['create', 'delete', 'read', 'update'], ['all', 'AllNetworks'])
  } else if (role === 'user') {
    can(
      ['read'],
      [
        'Contract',
        'Protocol',
        'Networks',
        'Dashboard',
        'Proposal',
        'UserContact'
      ],
      {
        hidden: false
      }
    )
  } else {
    can(
      ['read'],
      ['Contract', 'Protocol', 'Networks', 'Proposal', 'UserContact'],
      {
        hidden: false
      }
    )
  }

  return rules
}

export const buildAbilityFor = (role?: string): AppAbilityType => {
  return new AppAbility(defineRulesFor(role), {
    detectSubjectType: (object) => object.type
  })
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const AbilityContext = createContext<AppAbilityType>(undefined!)

AbilityContext.displayName = 'AbilityContext'

export const Can = createContextualCan(AbilityContext.Consumer)

export const useAbility = () => useCaslAbility(AbilityContext)
