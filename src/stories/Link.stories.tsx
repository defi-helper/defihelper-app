// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Link } from '~/common/link'

export default {
  title: 'components/Link',
  component: Link,
} as ComponentMeta<typeof Link>

const Template: ComponentStory<typeof Link> = (args) => <Link {...args} />

export const Primary = Template.bind({})
Primary.args = {
  children: 'Link',
  color: 'primary',
}

export const Blue = Template.bind({})
Blue.args = {
  children: 'Link',
  color: 'blue',
}
