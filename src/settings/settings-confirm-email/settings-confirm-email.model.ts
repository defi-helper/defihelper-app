import { createDomain } from 'effector-logger/macro'

import { UserContactEmailConfirmMutationVariables } from '~/api/_generated-types'
import { settingsApi } from '~/settings/common'

export const settingsConfirmEmailDomain = createDomain()

export const confirmEmailFx = settingsConfirmEmailDomain.createEffect(
  async (input: UserContactEmailConfirmMutationVariables['input']) => {
    return !!(await settingsApi.userContactConfirmEmail({ input }))
  }
)

export const $confirmEmail = settingsConfirmEmailDomain
  .createStore<{ code: string; status: boolean | undefined }[]>([])
  .on(confirmEmailFx, (state, payload) => {
    if (
      state.some(
        (confirmation) => confirmation.code === payload.confirmationCode
      )
    ) {
      return
    }

    return [...state, { code: payload.confirmationCode, status: undefined }]
  })
  .on(confirmEmailFx.done, (state, { params, result }) => {
    return state.map((email) =>
      email.code === params.confirmationCode
        ? { ...email, status: result }
        : email
    )
  })
