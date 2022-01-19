// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { NumericalInput } from '~/common/numerical-input'

export default {
  title: 'components/NumericalInput',
  component: NumericalInput,
} as ComponentMeta<typeof NumericalInput>

const Template: ComponentStory<typeof NumericalInput> = (args) => (
  <NumericalInput {...args} />
)

export const Example = Template.bind({})
Example.args = {
  placeholder: 'Placeholder',
  label: 'Label',
}

export const HelperText = Template.bind({})
HelperText.args = {
  placeholder: 'Placeholder',
  helperText: 'text',
}

export const Error = Template.bind({})
Error.args = {
  placeholder: 'Placeholder',
  helperText: 'error',
  error: true,
}
