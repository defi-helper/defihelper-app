/* eslint-disable class-methods-use-this */
import { AbstractConnector } from '@web3-react/abstract-connector'
import type {
  SendOptions,
  Transaction,
  TransactionSignature,
} from '@solana/web3.js'
import type EventEmitter from 'eventemitter3'

interface PhantomWalletEvents {
  connect(...args: unknown[]): unknown
  disconnect(...args: unknown[]): unknown
}

interface PhantomWallet extends EventEmitter<PhantomWalletEvents> {
  isPhantom?: boolean
  publicKey?: { toBytes(): Uint8Array }
  isConnected: boolean
  signTransaction(transaction: Transaction): Promise<Transaction>
  signAllTransactions(transactions: Transaction[]): Promise<Transaction[]>
  signAndSendTransaction(
    transaction: Transaction,
    options?: SendOptions
  ): Promise<{ signature: TransactionSignature }>
  signMessage(message: Uint8Array): Promise<{ signature: Uint8Array }>
  connect(): Promise<{ publicKey: { toString: () => string } }>
  disconnect(): Promise<void>
  _handleDisconnect(...args: unknown[]): unknown
}

interface PhantomWindow extends Window {
  solana?: PhantomWallet
}

declare const window: PhantomWindow

const CHAIN_ID = 'sol'

export class WavesKeeperConnector extends AbstractConnector {
  private account: string | null = null

  private provider: typeof window.solana | null = null

  constructor() {
    super()

    this.activate = this.activate.bind(this)
    this.getAccount = this.getAccount.bind(this)
  }

  async activate() {
    const provider = window.solana

    try {
      if (!provider) throw new Error('phantom is not available')

      if (!this.account) {
        const { publicKey } = await provider.connect()

        this.account = publicKey.toString()
      }

      if (!this.provider) {
        this.provider = provider
      }

      return {
        provider,
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
    this.provider?.disconnect()
  }

  public async isAuthorized() {
    return Boolean(window.solana?.isConnected)
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
