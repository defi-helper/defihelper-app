import omit from 'lodash.omit'
import { ButtonBase, ButtonBaseProps } from '~/common/button-base'
import { createComponent } from '~/common/create-component'

export type SelectOptionProps = {
  className?: string
  value?: string
  renderValue?: React.ReactNode
} & ButtonBaseProps

export const SelectOption = createComponent(function SelectOption(
  props: SelectOptionProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <ButtonBase {...omit(props, 'renderValue')} ref={ref}>
      {props.children}
    </ButtonBase>
  )
})
