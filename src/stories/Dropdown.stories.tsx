// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react'

import { Dropdown } from '~/common/dropdown'
import { Button } from '~/common/button'

export default {
  title: 'components/Dropdown',
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>

export const Example = () => {
  return <Dropdown control={<Button>Click</Button>}>content</Dropdown>
}
