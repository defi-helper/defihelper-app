/* eslint-disable @typescript-eslint/ban-ts-comment */

const ERROR = 'Adapter not loaded'

const moduleExports = {
  exports: new Error(ERROR)
}

type Staking = (
  provider: unknown,
  adapter: unknown
) => Promise<{
  claim: () => Promise<void>
  exit: () => Promise<void>
  metrics: {
    tvl: string
    aprDay: string
    aprWeek: string
    aprMonth: string
    aprYear: string
  }
  stake: () => Promise<void>
  unstake: () => Promise<void>
  wallet: () => Promise<void>
}>

export const loadScript = (url: string, adapter: string): Promise<Staking> => {
  return new Promise((resolve) => {
    // @ts-ignore
    window.module = moduleExports

    const script = document.createElement('script')

    script.src = url

    const handler = () => {
      const currentAdapter = window.module.exports[adapter]

      script.removeEventListener('load', handler)
      script.remove()

      // @ts-ignore
      window.module = moduleExports

      resolve(currentAdapter)
    }

    script.addEventListener('load', handler)

    document.body.appendChild(script)
  })
}
