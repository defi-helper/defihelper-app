export const PROTOCOLS = [
  {
    id: '1',
    logo: '',
    title: '1inch',
    description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis blanditiis doloremque asperiores facere voluptas nemo iste adipisci architecto? Fuga ipsum cum velit esse? Id harum obcaecati necessitatibus amet sint inventore!`,
    reward: {
      tokens: ['1INCH']
    },
    network: 'eth',
    link: 'https://1inch.exchange/#/dao/farming'
  },
  {
    id: '2',
    logo: '',
    title: 'Aave',
    description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis blanditiis doloremque asperiores facere voluptas nemo iste adipisci architecto? Fuga ipsum cum velit esse? Id harum obcaecati necessitatibus amet sint inventore!`,
    reward: {
      tokens: ['stkAAVE']
    },
    network: 'eth',
    link: 'https://aave.com'
  },
  {
    id: '3',
    logo: '',
    title: 'Alchemix',
    description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis blanditiis doloremque asperiores facere voluptas nemo iste adipisci architecto? Fuga ipsum cum velit esse? Id harum obcaecati necessitatibus amet sint inventore!`,
    reward: {
      tokens: ['ALCX']
    },
    network: 'eth',
    link: 'https://app.alchemix.fi/farms'
  },
  {
    id: '4',
    logo: '',
    title: 'Basis',
    description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis blanditiis doloremque asperiores facere voluptas nemo iste adipisci architecto? Fuga ipsum cum velit esse? Id harum obcaecati necessitatibus amet sint inventore!`,
    reward: {
      tokens: ['BAS', 'BAC']
    },
    network: 'eth',
    link: 'https://basis.cash'
  },
  {
    id: '5',
    logo: '',
    title: 'Basket DAO',
    description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis blanditiis doloremque asperiores facere voluptas nemo iste adipisci architecto? Fuga ipsum cum velit esse? Id harum obcaecati necessitatibus amet sint inventore!`,
    reward: {
      tokens: ['BASK']
    },
    network: 'waves',
    link: 'https://basketdao.org'
  },
  {
    id: '6',
    logo: '',
    title: 'Benchmark',
    description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis blanditiis doloremque asperiores facere voluptas nemo iste adipisci architecto? Fuga ipsum cum velit esse? Id harum obcaecati necessitatibus amet sint inventore!`,
    reward: {
      tokens: ['MARK']
    },
    network: 'waves',
    link: 'https://launchpad.benchmarkprotocol.finance/pools'
  },
  {
    id: '7',
    logo: '',
    title: 'Big Data Protocol',
    description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis blanditiis doloremque asperiores facere voluptas nemo iste adipisci architecto? Fuga ipsum cum velit esse? Id harum obcaecati necessitatibus amet sint inventore!`,
    reward: {
      tokens: ['BDP', 'bALPHA']
    },
    network: 'bsc',
    link: 'https://www.bigdataprotocol.com/datavault'
  },
  {
    id: '8',
    logo: '',
    title: 'Cover Protocol',
    description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis blanditiis doloremque asperiores facere voluptas nemo iste adipisci architecto? Fuga ipsum cum velit esse? Id harum obcaecati necessitatibus amet sint inventore!`,
    reward: {
      tokens: ['Various']
    },
    network: 'bsc',
    link: 'https://app.coverprotocol.com'
  },
  {
    id: '9',
    logo: '',
    title: 'Cryptex',
    description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis blanditiis doloremque asperiores facere voluptas nemo iste adipisci architecto? Fuga ipsum cum velit esse? Id harum obcaecati necessitatibus amet sint inventore!`,
    reward: {
      tokens: ['CTX']
    },
    network: 'bsc',
    link: 'https://app.cryptex.finance'
  }
]

export const PROTOCOLS_MAP = PROTOCOLS.reduce<
  Record<string, typeof PROTOCOLS[number]>
>((acc, protocol) => {
  acc[protocol.id] = protocol

  return acc
}, {})

export const NETWORKS: Record<string, string> = {
  bsc: 'BSC',
  waves: 'Waves',
  eth: 'Ethereum'
}
