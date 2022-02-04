/* eslint-disable class-methods-use-this */
import { AbstractConnector } from '@web3-react/abstract-connector'
import type { Signer as WavesSigner } from '@waves/signer'
import type { ProviderWeb } from '@waves.exchange/provider-web'

const CHAIN_ID = 'main'

type Options = {
  nodeUrl?: string
  signerUrl?: string
}

let waves: WavesSigner | null = null
let exchange: ProviderWeb | null = null

export class WavesExchangeConnector extends AbstractConnector {
  private account: string | null = null

  private provider: WavesSigner | null = null

  public publicKey: string | null = null

  private options: Options

  constructor(options: Options = {}) {
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
      /* webpackChunkName: "waves-provider-web" */ '@waves.exchange/provider-web'
    ).then((m) => m.ProviderWeb)

    waves =
      waves ??
      new Signer(
        this.options.nodeUrl
          ? { NODE_URL: this.options.nodeUrl }
          : { LOG_LEVEL: 'verbose' }
      )
    exchange = exchange ?? new Provider(this.options.signerUrl)

    waves.setProvider(exchange)

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
      throw new Error(typeof e === 'string' ? e : 'Something went wrong')
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
