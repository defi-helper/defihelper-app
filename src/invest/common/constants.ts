import { ContractRiskFactorEnum } from '~/api'

export const riskStatuses = {
  [ContractRiskFactorEnum.High]: 'High risk',
  [ContractRiskFactorEnum.Low]: 'Low risk',
  [ContractRiskFactorEnum.Moderate]: 'Moderate risk',
  [ContractRiskFactorEnum.NotCalculated]: '-',
}

export const riskIcons: Record<string, 'redRisk' | 'greenRisk' | 'yellowRisk'> =
  {
    [ContractRiskFactorEnum.High]: 'redRisk',
    [ContractRiskFactorEnum.Low]: 'greenRisk',
    [ContractRiskFactorEnum.Moderate]: 'yellowRisk',
  }
