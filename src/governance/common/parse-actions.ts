import { nanoid } from 'nanoid'

export const parseActions = (
  targets: string[],
  callDatas: string[][],
  signatures: string[]
) => {
  return targets.map((target, index) => {
    const signature = signatures[index]

    return {
      id: nanoid(),
      target,
      signature: signature.replace(/\((.*?)\)/g, ''),
      callDatas: callDatas[index],
    }
  })
}
