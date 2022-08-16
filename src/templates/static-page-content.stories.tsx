import React from 'react'
import { Story } from '@storybook/react'
import StaticPageContentTemplate, { StaticPageContentTemplateProps } from './static-page-content-template'
import { Default as ctaDefault } from '../components/widgets/InlineCta/InlineCta.stories'
import { Default as cardSectionDefault } from '../components/widgets/CardSection/CardSection.stories'
import { Default as blocksDefault } from '../components/widgets/AlternatingImagesText/AlternatingImagesText.stories'
import { Default as heroDefault } from '../components/widgets/Hero/Hero.stories'
import { InlineCtaProps } from '../components/widgets/InlineCta'
import { CardSectionProps } from '../components/widgets/CardSection'
import { BlockWithImage } from '../components/widgets/AlternatingImagesText'
import { HeroProps } from '../components/widgets/Hero'
import PreviewProviders from '../cms/PreviewProviders'

export default {
  title: 'Pages / Static Page Content',
  component: StaticPageContentTemplate,
}

const Template: Story<StaticPageContentTemplateProps> = (args) => (
  <PreviewProviders>
    <StaticPageContentTemplate {...args} />
  </PreviewProviders>
)

export const Default = Template.bind({})
Default.args = {
  invertContent: false,
  inlineCta: ctaDefault.args as InlineCtaProps,
  cardSection: cardSectionDefault.args as CardSectionProps,
  blocks: blocksDefault.args?.blocks as BlockWithImage[],
  hero: heroDefault.args as HeroProps,
  content: {
    title: 'Lorem Ipsum',
    description:
      'Nulla ac elementum dolor. Duis finibus elit elit, nec volutpat augue venenatis id. Etiam tincidunt nisi lorem, eu venenatis nunc finibus quis. Curabitur at diam quis neque ultricies tristique.',
    publishDate: 'January 25, 2021',
    path: '/lorem-ipsum',
  },
  relatedArticlesTitle: 'Lorem Ipsum',
}
