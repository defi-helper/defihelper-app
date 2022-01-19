// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Icon } from '~/common/icon'

export default {
  title: 'components/Icon',
  component: Icon,
} as ComponentMeta<typeof Icon>

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />

export const Example = Template.bind({})
Example.args = {
  icon: 'BAG',
  width: 30,
  height: 30,
}
