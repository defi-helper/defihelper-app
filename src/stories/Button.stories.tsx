// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Button } from '~/common/button'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'components/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Button>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
  color: 'primary',
  children: 'Button',
}

export const AsLink = Template.bind({})
AsLink.args = {
  color: 'primary',
  as: 'a',
  href: '#',
  children: 'Button',
}

export const Secondary = Template.bind({})
Secondary.args = {
  color: 'secondary',
  children: 'Button',
}

export const Large = Template.bind({})
Large.args = {
  size: 'large',
  children: 'Button',
}

export const Medium = Template.bind({})
Medium.args = {
  size: 'medium',
  children: 'Button',
}

export const Small = Template.bind({})
Small.args = {
  size: 'small',
  children: 'Button',
}
