import { v4 as uuidv4 } from 'uuid'

export const parseActions = (
  targets: string[],
  callDatas: string[][],
  signatures: string[]
) => {
  return targets.map((target, index) => {
    const signature = signatures[index]

    return {
      id: uuidv4(),
      target,
      signature: signature.replace(/\((.*?)\)/g, ''),
      callDatas: callDatas[index],
    }
  })
}
