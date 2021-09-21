import React from 'react'
import { Story } from '@storybook/react'
import Container from '../common/Container'
import HeroWithCTA, { HeroWithCTAProps } from './HeroWithCTA'

export default {
  title: 'Components / Hero with CTA',
  component: HeroWithCTA,
}

const Template: Story<HeroWithCTAProps> = (args) => (
  <Container size='large'>
    <HeroWithCTA {...args} />
  </Container>
)

export const Default = Template.bind({})
Default.args = {
  title: 'Cras pellentesque arcu eu ligula tristique lacinia.',
  children:
    'Curabitur sit amet vestibulum ex. Aenean et purus fermentum, accumsan ante vel, sollicitudin odio. Praesent ut nunc tortor. Pellentesque cursus ante et augue convallis malesuada.',
  ctaText: 'Action',
  ctaHref: '/',
}
