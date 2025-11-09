/* eslint-disable @typescript-eslint/no-var-requires */
const cachios = require('cachios');
const fs = require('fs');
const path = require('path');

require('dotenv').config({ path: path.resolve(process.cwd(), '.env') });

const ENV = process.env.REACT_APP_ENV || '';
const API_URL = process.env.REACT_APP_API_URL;

if (!API_URL) {
  throw new Error('REACT_APP_API_URL env değişkeni tanımlı değil.');
}

const isTestnet = ENV.toLowerCase() === 'development';

const graphqlQuery = {
  operationName: 'WalletConfig',
  query: `query WalletConfig($testnet: Boolean) {
    config {
      blockchain {
        ethereum(filter: { testnet: $testnet }) {
          id
          title
          testnet
          explorerURL
          coin
          decimals
          blockchain
          icon
          rpcUrls
        }
        waves(filter: { testnet: $testnet }) {
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
  variables: { testnet: isTestnet },
};

async function start() {
  const { data } = await cachios.post(API_URL, graphqlQuery, {
    headers: { 'Content-Type': 'application/json' },
  });

  const { config } = data.data;

  const allNetworks = Object.values(config.blockchain)
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
    );

  const networksJson = JSON.stringify(allNetworks, null, 2);

  const outDir = path.resolve(process.cwd(), 'src');
  const outFile = path.join(outDir, 'networks.ts');

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(
    outFile,
    `/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
export const networks = ${networksJson} as const
`
  );
}

start().catch((err) => {
  console.error('Konfigürasyon çekme veya dosya yazma hatası:', err?.message || err);
  process.exit(1);
});
