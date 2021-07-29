/* eslint-disable class-methods-use-this */
import { AbstractConnector } from '@web3-react/abstract-connector'

const CHAIN_ID = 'waves'

const ERROR_MESSAGE = 'Account is null'

type Options = {
  authData: WavesKeeper.IAuthData
  nodeUrl?: string
  signerUrl?: string
}

export class WavesKeeperConnector extends AbstractConnector {
  private account: string | null = null

  private options: Options

  constructor(options: Options) {
    super()

    this.activate = this.activate.bind(this)
    this.getAccount = this.getAccount.bind(this)

    this.options = options
  }

  async activate() {
    if (!window.WavesKeeper) {
      throw new Error("WavesKeeper hasn't installed")
    }

    if (window.WavesKeeper?.on) {
      window.WavesKeeper.on('update', (state) => {
        if (state.account?.address) {
          this.account = state.account.address
        }
      })
    }

    if (!this.account) {
      const state = await window.WavesKeeper.auth(this.options.authData)

      this.account = state.address

      // eslint-disable-next-line no-unused-vars
      const resp = await window.WavesKeeper.signCustomData({
        version: 2,
        data: [{ type: 'string', key: 'name', value: 'hello' }],
      })

      return {
        provider: window.WavesKeeper,
        chainId: CHAIN_ID,
        account: this.account,
      }
    }

    return {
      provider: window.WavesKeeper,
      chainId: CHAIN_ID,
      account: this.account,
    }
  }

  public deactivate() {
    return undefined
  }

  public async getAccount() {
    const state = await window.WavesKeeper.publicState()

    const account = state.account?.address

    if (account !== undefined) {
      this.account = account

      return account
    }

    return Promise.reject(new Error(ERROR_MESSAGE))
  }

  public async getChainId() {
    return CHAIN_ID
  }

  public async getProvider() {
    return window.WavesKeeper
  }
}
