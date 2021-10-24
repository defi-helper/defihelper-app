import { ButtonBase, ButtonBaseProps } from '~/common/button-base'
import { createComponent } from '~/common/create-component'

export type SelectOptionProps = {
  className?: string
  value?: string
} & ButtonBaseProps

export const SelectOption = createComponent(function SelectOption(
  props: SelectOptionProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <ButtonBase {...props} ref={ref}>
      {props.children}
    </ButtonBase>
  )
})
