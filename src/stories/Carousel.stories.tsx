// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react'

import { Carousel } from '~/common/carousel'
import { Paper } from '~/common/paper'

export default {
  title: 'components/Carousel',
  component: Carousel,
} as ComponentMeta<typeof Carousel>

export const Example = () => {
  return (
    <Carousel>
      <Paper>1</Paper>
      <Paper>2</Paper>
      <Paper>3</Paper>
      <Paper>4</Paper>
      <Paper>5</Paper>
      <Paper>6</Paper>
      <Paper>7</Paper>
      <Paper>8</Paper>
      <Paper>9</Paper>
    </Carousel>
  )
}
