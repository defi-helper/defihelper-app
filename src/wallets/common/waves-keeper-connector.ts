/* eslint-disable class-methods-use-this */
import { AbstractConnector } from '@web3-react/abstract-connector'

const CHAIN_ID = 1

export class WavesKeeperConnector extends AbstractConnector {
  private account: string | null = null

  constructor() {
    super()

    this.activate = this.activate.bind(this)
    this.getAccount = this.getAccount.bind(this)
  }

  async activate() {
    if (!window.WavesKeeper) {
      throw new Error('')
    }

    if (window.WavesKeeper?.on) {
      window.WavesKeeper.on('update', (state) => {
        if (state.account?.address) {
          this.account = state.account.address
        }
      })
    }

    if (!this.account) {
      throw new Error('Account is null')
    }

    const authData = {
      data: 'Auth on site'
    }
    return window.WavesKeeper.auth(authData).then((state) => {
      this.account = state.address

      return {
        provider: window.WavesKeeper,
        chainId: CHAIN_ID,
        account: this.account
      }
    })
  }

  public deactivate() {}

  public async getAccount() {
    return window.WavesKeeper.publicState().then((state) => {
      const account = state.account?.address

      if (account !== undefined) {
        this.account = account

        return account
      }

      return Promise.reject(new Error('Account is null'))
    })
  }

  public async getChainId() {
    return CHAIN_ID
  }

  public async getProvider() {
    return window.WavesKeeper
  }
}
