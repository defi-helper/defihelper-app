import { ContractRiskFactorEnum } from '~/api'

export const riskStatuses = {
  [ContractRiskFactorEnum.High]: 'High',
  [ContractRiskFactorEnum.Low]: 'Low',
  [ContractRiskFactorEnum.Moderate]: 'Moderate',
  [ContractRiskFactorEnum.NotCalculated]: '-',
}

export const riskIcons: Record<string, 'redRisk' | 'greenRisk' | 'yellowRisk'> =
  {
    [ContractRiskFactorEnum.High]: 'redRisk',
    [ContractRiskFactorEnum.Low]: 'greenRisk',
    [ContractRiskFactorEnum.Moderate]: 'yellowRisk',
  }
