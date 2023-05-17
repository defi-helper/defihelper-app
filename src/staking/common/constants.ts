export const isExcludedAdapter = (contractAdapter: string) => {
  return ['tom', 'xJoe'].includes(contractAdapter)
}
export const envs: Record<
  string,
  { pm: string; router: string; quoter: string; graphs: string } | undefined
> = {
  1: {
    // ethereum
    pm: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
    router: '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45',
    quoter: '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6',
    graphs: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
  },
  5: {
    // goerli
    pm: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
    router: '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45',
    quoter: '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6',
    graphs: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
  },
  10: {
    // optimism
    pm: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
    router: '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45',
    quoter: '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6',
    graphs:
      'https://api.thegraph.com/subgraphs/name/ianlapham/optimism-post-regenesis',
  },
  56: {
    // bsc
    pm: '0x7b8A01B39D58278b5DE7e48c8449c9f4F5170613',
    router: '0xB971eF87ede563556b2ED4b1C0b0019111Dd85d2',
    quoter: '0x78D78E420Da98ad378D7799bE8f4AF69033EB077',
    graphs: 'https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-bsc',
  },
  42161: {
    // arbitrum
    pm: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
    router: '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45',
    quoter: '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6',
    graphs: 'https://api.thegraph.com/subgraphs/name/ianlapham/arbitrum-dev',
  },
  137: {
    // polygon
    pm: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
    router: '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45',
    quoter: '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6',
    graphs:
      'https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-polygon',
  },
}
