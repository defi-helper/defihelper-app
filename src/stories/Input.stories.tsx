// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Input } from '~/common/input'

export default {
  title: 'components/Input',
  component: Input,
} as ComponentMeta<typeof Input>

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />

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
