// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Paper } from '~/common/paper'

export default {
  title: 'components/Paper',
  component: Paper,
} as ComponentMeta<typeof Paper>

const Template: ComponentStory<typeof Paper> = (args) => <Paper {...args} />

export const Example = Template.bind({})
Example.args = {
  children: 'Paper',
}
