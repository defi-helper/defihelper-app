import { createDomain, guard } from 'effector-logger/macro'
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

guard({
  source: ReferralGate.status,
  clock: [ReferralGate.open, authModel.$user.updates],
  filter: (isOpened: boolean) => isOpened,
  target: fetchMyReferralCodeFx,
})

$referrerCode.reset(ReferralGate.close, authModel.logoutFx.done)
