import React from 'react'
import { Story } from '@storybook/react'
import CustomizableCTA, { CustomizableCTAProps } from './CustomizableCTA'

export default {
  title: 'Components / Customizable CTA',
  component: CustomizableCTA,
}

const Template: Story<CustomizableCTAProps> = (args) => <CustomizableCTA {...args} />

export const Default = Template.bind({})
Default.args = {
  subHeader: 'Stay Up to Date',
  children: 'Sign up to our newsletter for anti-fraud news',
  ctaText: 'Subscribe',
  ctaHref: '/',
  hideWhenScroll: false,
  openCtaNewTab: false,
}
