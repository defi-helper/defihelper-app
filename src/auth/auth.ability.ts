import { AbilityBuilder, Ability, AbilityClass } from '@casl/ability'
import { createContext } from 'react'
import { createContextualCan, useAbility as useCaslAbility } from '@casl/react'

type Entities =
  | 'Portfolio'
  | 'AllNetworks'
  | 'Networks'
  | 'Protocol'
  | 'Contract'
  | 'all'
  | 'Proposal'
  | 'UserContact'
  | 'Wallet'
  | 'Governance'
  | 'User'
  | 'NonDemo'

export type Actions = 'create' | 'read' | 'update' | 'delete'
export type Subjects = Entities | { type: Entities }

export type AppAbilityType = Ability<[Actions, Subjects]>
export const AppAbility = Ability as AbilityClass<AppAbilityType>

export const defineRulesFor = (role?: string) => {
  const { can, rules } = new AbilityBuilder(AppAbility)

  switch (role) {
    case 'admin':
      can(['create', 'delete', 'read', 'update'], ['all'])
      break
    case 'demo':
      can(
        ['read'],
        [
          'Contract',
          'Protocol',
          'Networks',
          'Portfolio',
          'Proposal',
          'UserContact',
        ],
        {
          hidden: false,
        }
      )
      break
    default:
      can(
        ['read'],
        [
          'Contract',
          'Protocol',
          'Networks',
          'Portfolio',
          'Proposal',
          'UserContact',
          'NonDemo',
        ],
        {
          hidden: false,
        }
      )
      break
  }

  return rules
}

export const buildAbilityFor = (role?: string): AppAbilityType => {
  return new AppAbility(defineRulesFor(role), {
    detectSubjectType: (object) => object.type,
  })
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const AbilityContext = createContext<AppAbilityType>(undefined!)

AbilityContext.displayName = 'AbilityContext'

export const Can = createContextualCan(AbilityContext.Consumer)

export const useAbility = () => useCaslAbility(AbilityContext)
