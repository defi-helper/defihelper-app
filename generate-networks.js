/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require('cachios')
const fs = require('fs')

const isDev = process.env.REACT_APP_ENV === 'development'
const apiUrl = 'https://backend-dev.defihelper.info/api'

const graphqlQuery = {
  operationName: 'WalletConfig',
  query: `query WalletConfig {
    config {
      blockchain {
        ethereum {
          id
          title
          testnet
          explorerURL
          coin
          decimals
          blockchain
          icon
        }
        waves {
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
    filter: {
      testnet: isDev,
    },
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
