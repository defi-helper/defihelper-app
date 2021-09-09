import { useMemo, useState } from 'react'

import { Typography } from '~/common/typography'
import { governancePresets, GovernancePreset } from '~/governance-presets'
import { GovernanceActionsStepper } from '../governance-actions-stepper'
import { GovernanceAction } from '../governance.types'
import { GovernanceActionsSelect } from '../governance-actions-select'
import { GovernanceActionsTemplateParams } from '../governance-actions-template-params'
import { parseContract, AbiItem } from '../parse-contract'
import { abi, isContract } from '~/abi'

export type GovernanceActionsTemplateProps = {
  onBack: () => void
  onSubmit: (action: GovernanceAction[]) => void
}

const presets = governancePresets.reduce<Map<string, GovernancePreset>>(
  (acc, preset) => {
    acc.set(preset.title, preset)

    return acc
  },
  new Map()
)

export const GovernanceActionsTemplate: React.VFC<GovernanceActionsTemplateProps> =
  (props) => {
    const [currentPreset, setPreset] = useState('')

    const preset = useMemo(() => presets.get(currentPreset), [currentPreset])

    const preconfiguredActions = useMemo(() => {
      return preset?.actions.map((action) => {
        return {
          contract: action.contract,
          method: action.method,
          address: '',
          inputs: action.input.map((input, index) => {
            const parsedMethods = isContract(action.contract)
              ? parseContract(abi[action.contract] as { abi: AbiItem[] })
              : null
            const parsedInput = parsedMethods?.[action.method]?.inputs[index]

            return {
              ...input,
              type: input.type,
              value: preset?.variables[input.value]?.default ?? input.value,
              presetVariable: input.value,
              name: parsedInput?.name ?? '',
            }
          }),
        }
      })
    }, [preset])

    const steps = [
      <GovernanceActionsSelect
        key={1}
        onSubmit={setPreset}
        options={Array.from(presets.keys())}
      >
        Choose template
      </GovernanceActionsSelect>,
      <GovernanceActionsTemplateParams
        key={2}
        actions={preconfiguredActions}
        onSubmit={props.onSubmit}
      >
        {preset?.title}
        <Typography variant="body2" as="div">
          {preset?.description}
        </Typography>
      </GovernanceActionsTemplateParams>,
    ]

    return (
      <GovernanceActionsStepper onBack={props.onBack}>
        {steps}
      </GovernanceActionsStepper>
    )
  }
