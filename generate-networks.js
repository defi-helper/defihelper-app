/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require('cachios')
const fs = require('fs')
const path = require('path')

require('dotenv').config({ path: path.resolve(process.cwd(), '.env') })

const isDev =
  process.env.REACT_APP_ENV !== undefined &&
  process.env.REACT_APP_ENV === 'development'
    ? undefined
    : false
const apiUrl = process.env.REACT_APP_API_URL

const graphqlQuery = {
  operationName: 'WalletConfig',
  query: `query WalletConfig($testnet: Boolean) {
    config {
      blockchain {
        ethereum(filter: {
          testnet: $testnet
        }) {
          id
          title
          testnet
          explorerURL
          coin
          decimals
          blockchain
          icon
        }
        waves(filter: {
          testnet: $testnet
        }) {
          id
          title
          testnet
          explorerURL
          coin
          decimals
          blockchain
          icon
        }
      }
    }
  }`,
  variables: {
    testnet: isDev,
  },
}

const start = async () => {
  const { data } = await axios.post(apiUrl, graphqlQuery)

  const { config } = data.data

  const networks = JSON.stringify(
    Object.values(config.blockchain)
      .flat()
      .map(({ id, ...networkConfig }) => ({
        ...networkConfig,
        chainId: Number.isNaN(Number(id)) ? id : Number(id),
      }))
      .reduce(
        (acc, networkConfig) => ({
          ...acc,
          [networkConfig.chainId]: networkConfig,
        }),
        {}
      ),
    null,
    2
  )

  fs.writeFileSync(
    './src/networks.ts',
    `/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
export const networks = ${networks} as const
`
  )
}

start()
