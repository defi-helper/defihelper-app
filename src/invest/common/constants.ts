import { TokenRiskScoringEnum } from '~/api'

export const riskStatuses = {
  [TokenRiskScoringEnum.High]: 'High risk',
  [TokenRiskScoringEnum.Low]: 'Low risk',
  [TokenRiskScoringEnum.Moderate]: 'Moderate risk',
  [TokenRiskScoringEnum.NotCalculated]: '-',
}

export const riskIcons: Record<
  string,
  'redRisk' | 'greenRisk' | 'yellowRisk' | 'greyRisk'
> = {
  [TokenRiskScoringEnum.NotCalculated]: 'greyRisk',
  [TokenRiskScoringEnum.High]: 'redRisk',
  [TokenRiskScoringEnum.Low]: 'greenRisk',
  [TokenRiskScoringEnum.Moderate]: 'yellowRisk',
}
