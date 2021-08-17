interface AbiInput {
  name: string
  type: string
  indexed?: boolean
  components?: AbiInput[]
  internalType?: string
}

type AbiType = 'function' | 'constructor' | 'event' | 'fallback'
type StateMutabilityType = 'pure' | 'view' | 'nonpayable' | 'payable'

interface AbiOutput {
  name: string
  type: string
  components?: AbiOutput[]
  internalType?: string
}

export interface AbiItem {
  anonymous?: boolean
  constant?: boolean
  inputs?: AbiInput[]
  name?: string
  outputs?: AbiOutput[]
  payable?: boolean
  stateMutability?: StateMutabilityType
  type: AbiType
  gas?: number
}

export type ContractMethodInput = {
  type: string
  name: string
  value: string
}

export type ContractMethod = {
  methodName: string
  inputs: ContractMethodInput[]
}

export const parseContract = <T extends { abi: AbiItem[] }>(contract: T) => {
  return contract.abi.reduce<Record<string, ContractMethod>>(
    (acc, { name = '', type, stateMutability, inputs }) => {
      const isFunction = type === 'function'
      const stateNotViewAndPure =
        stateMutability !== 'view' && stateMutability !== 'pure'

      if (isFunction && stateNotViewAndPure) {
        const newInputs =
          inputs?.map((input) => ({
            type: input.type,
            name: input.name,
            value: '',
          })) ?? []

        const payable =
          stateMutability === 'payable'
            ? { type: 'ether', name: 'payable', value: '' }
            : null

        acc[name] = {
          methodName: name,
          inputs: payable ? [payable, ...newInputs] : newInputs,
        }
      }

      return acc
    },
    {}
  )
}
