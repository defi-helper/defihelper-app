// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Typography } from '~/common/typography'

export default {
  title: 'components/Typography',
  component: Typography,
} as ComponentMeta<typeof Typography>

const Template: ComponentStory<typeof Typography> = (args) => (
  <Typography {...args} />
)

export const H1 = Template.bind({})
H1.args = {
  children: 'Text',
  variant: 'h1',
}

export const H2 = Template.bind({})
H2.args = {
  children: 'Text',
  variant: 'h2',
}

export const H3 = Template.bind({})
H3.args = {
  children: 'Text',
  variant: 'h3',
}

export const H4 = Template.bind({})
H4.args = {
  children: 'Text',
  variant: 'h4',
}

export const H5 = Template.bind({})
H5.args = {
  children: 'Text',
  variant: 'h5',
}

export const Body1 = Template.bind({})
Body1.args = {
  children: 'Text',
  variant: 'body1',
}

export const Body2 = Template.bind({})
Body2.args = {
  children: 'Text',
  variant: 'body2',
}

export const Body3 = Template.bind({})
Body3.args = {
  children: 'Text',
  variant: 'body3',
}

export const AsCustomComponent = Template.bind({})
AsCustomComponent.args = {
  children: 'Text',
  variant: 'body3',
  as: 'span',
}

export const Inherit = Template.bind({})
Inherit.args = {
  children: 'Text',
  variant: 'inherit',
}
