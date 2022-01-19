// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Switch } from '~/common/switch'

export default {
  title: 'components/Switch',
  component: Switch,
} as ComponentMeta<typeof Switch>

const Template: ComponentStory<typeof Switch> = (args) => <Switch {...args} />

export const Example = Template.bind({})
Example.args = {
  checked: false,
  onChange: () => {},
}
