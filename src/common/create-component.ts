import React, { forwardRef } from 'react'

export const createComponent = <T, P = Record<string, unknown>>(
  render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
): ((props: P & React.RefAttributes<T>) => React.ReactElement | null) => {
  return forwardRef(render)
}
