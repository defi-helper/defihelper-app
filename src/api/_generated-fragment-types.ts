/* eslint-disable */

export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[]
  }
}
const result: PossibleTypesResultData = {
  possibleTypes: {
    TokenPriceFeedType: [
      'TokenPriceFeedCoingeckoIdType',
      'TokenPriceFeedCoingeckoAddressType',
    ],
  },
}
export default result
