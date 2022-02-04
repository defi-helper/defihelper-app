/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
import { AbstractConnector } from '@web3-react/abstract-connector'
import type { Signer as WavesSigner } from '@waves/signer'

const CHAIN_ID = 'main'

type Options = {
  authData: WavesKeeper.IAuthData
  nodeUrl?: string
  signerUrl?: string
}

export class WavesKeeperConnector extends AbstractConnector {
  private account: string | null = null

  private provider: WavesSigner | null = null

  public publicKey: string | null = null

  private options: Options

  constructor(options: Options) {
    super()

    this.activate = this.activate.bind(this)
    this.getAccount = this.getAccount.bind(this)

    this.options = options
  }

  async activate() {
    const Signer = await import(
      /* webpackChunkName: "waves-signer" */ '@waves/signer'
    ).then((m) => m.Signer)
    const Provider = await import(
      /* webpackChunkName: "waves-provider-keeper" */ '@defihelper/provider-keeper'
    ).then((m) => m.ProviderKeeper)

    const waves = new Signer(
      this.options.nodeUrl
        ? { NODE_URL: this.options.nodeUrl }
        : { LOG_LEVEL: 'verbose' }
    )

    const keeper = new Provider(this.options.authData)

    await keeper.connect({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      NODE_URL: this.options.nodeUrl!,
      NETWORK_BYTE: 'W'.charCodeAt(0),
    })

    waves.setProvider(keeper)

    try {
      if (!this.account) {
        const { address, publicKey } = await waves.login()

        this.account = address
        this.publicKey = publicKey
      }

      if (!this.provider) {
        this.provider = waves
      }

      return {
        provider: waves,
        chainId: CHAIN_ID,
        account: this.account,
      }
    } catch (e) {
      if (typeof e === 'string') throw new Error(e)

      if (e instanceof Error) throw e

      throw new Error('something went wrong')
    }
  }

  public deactivate() {
    this.provider
      ?.logout()
      // eslint-disable-next-line no-console
      .then(() => console.log('logout success'))
      .catch((error) => console.error(error.message))
  }

  public async isAuthorized() {
    if (!this.provider) return false

    const state = await this.provider.login()

    return Boolean(state.address)
  }

  public async getAccount() {
    return this.account
  }

  public async getChainId() {
    return CHAIN_ID
  }

  public async getProvider() {
    return this.provider
  }
}
