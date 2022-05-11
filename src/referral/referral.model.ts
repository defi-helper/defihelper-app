import { createDomain, sample } from 'effector-logger/macro'
import { createGate } from 'effector-react'
import { ReferrerCodeFragment } from '~/api/_generated-types'
import { authModel } from '~/auth'
import { referralApi } from './common/referral.api'

const referralDomain = createDomain()

export const fetchMyReferralCodeFx = referralDomain.createEffect(() => {
  return referralApi.getMyReferrerCode({})
})
export const $referrerCode = referralDomain
  .createStore<ReferrerCodeFragment | null>(null)
  .on(fetchMyReferralCodeFx.doneData, (_, payload) => payload)

export const ReferralGate = createGate({
  domain: referralDomain,
  name: 'ReferralGate',
})

sample({
  clock: ReferralGate.open,
  target: [fetchMyReferralCodeFx],
})

$referrerCode.reset(ReferralGate.close, authModel.logoutFx.done)
