/* eslint-disable */

export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[]
  }
}
const result: PossibleTypesResultData = {
  possibleTypes: {
    SmartTradeOrderCallDataType: [
      'SmartTradeMockHandlerCallDataType',
      'SmartTradeSwapHandlerCallDataType',
    ],
    TokenPriceFeedType: [
      'TokenPriceFeedCoingeckoIdType',
      'TokenPriceFeedCoingeckoAddressType',
    ],
  },
}
export default result
