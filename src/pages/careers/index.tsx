import React from 'react'
import { LayoutTemplate } from '../../components/Layout'
import BreadcrumbsSEO from '../../components/Breadcrumbs/BreadcrumbsSEO'
import HeroSection from '../../components/HeroWithCTA/HeroWithCTA'
import Container from '../../components/common/Container'
import BannerWithCTA from '../../components/BannerWithCTA/BannerWithCTA'

import MissionAndVisionSection from '../../components/careers/MissionAndVisionSection/MissionAndVisionSection'
import WhatWeOfferSection, { OurValuesSection } from '../../components/careers/WhatWeOfferSection/WhatWeOfferSection'
import TeamMembersSection, {
  TeamMembersSectionProps,
} from '../../components/careers/TeamMembersSection/TeamMembersSection'
import LifeAtFingerSection from '../../components/careers/LifeAtFingerSection/LifeAtFingerSection'
import OurInvestorsSection from '../../components/careers/OurInvestorsSection/OurInvestorsSection'
import InTheMediaSection from '../../components/careers/InTheMediaSection/InTheMediaSection'

import { PATH } from '../../constants/content'

import { GeneratedPageContext } from '../../helpers/types'

import { useStaticQuery, graphql, HeadProps } from 'gatsby'
import { SEO } from '../../components/SEO/SEO'

import styles from './Careers.module.scss'

interface CareersPageProps {
  pageContext: GeneratedPageContext
}
export default function CareersPage({ pageContext }: CareersPageProps) {
  const breadcrumbs = pageContext.breadcrumb.crumbs

  const data = useStaticQuery(graphql`
    query TeamMembersQuery {
      teamMembers: teamMembersYaml {
        totalMembers
      }
    }
  `)
  const teamMembers = data?.teamMembers as TeamMembersSectionProps

  return (
    <LayoutTemplate>
      {breadcrumbs && <BreadcrumbsSEO breadcrumbs={breadcrumbs} />}
      <HeroSection
        className={styles.heroSection}
        title='Work at Fingerprint'
        ctaText1='Explore our jobs'
        ctaHref1={PATH.jobs}
        openNewTab
        variant='secondary'
      >
        We&apos;re a 100% remote, global team on the cutting edge of online security. Join us!
      </HeroSection>
      <MissionAndVisionSection />
      <WhatWeOfferSection />
      <TeamMembersSection {...teamMembers} />
      <OurValuesSection />
      <LifeAtFingerSection />
      <OurInvestorsSection />
      <Container size='large'>
        <BannerWithCTA
          className={styles.ctaSection}
          title='Work at Fingerprint'
          ctaText='Explore our jobs'
          ctaHref={PATH.jobs}
          variant='white'
        >
          We&apos;re a 100% remote, global team on the cutting edge of online security. Join us!
        </BannerWithCTA>
      </Container>
      <InTheMediaSection />
    </LayoutTemplate>
  )
}

export function Head(props: HeadProps) {
  return (
    <SEO
      pathname={props.location.pathname}
      title='Fingerprint Careers - Join Our 100% Remote Team'
      description="We're empowering developers to stop online fraud. Join us in building world-class APIs for identification and fraud detection."
    />
  )
}
