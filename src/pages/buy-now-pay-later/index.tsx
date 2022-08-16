import React from 'react'
import { LayoutTemplate } from '../../components/Layout'
import BreadcrumbsSEO from '../../components/Breadcrumbs/BreadcrumbsSEO'
import { GeneratedPageContext } from '../../helpers/types'
import { PATH } from '../../constants/content'

import HeroSection from '../../components/HeroWithCTA/HeroWithCTA'
import ClientsSection from '../../components/Bnpl/ClientsSection/ClientsSection'
import BenefitsSection from '../../components/Bnpl/BenefitsSection/BenefitsSection'
import BannerWithCTA from '../../components/BannerWithCTA/BannerWithCTA'
import Container from '../../components/common/Container'

import { SEO } from '../../components/SEO/SEO'
import { HeadProps } from 'gatsby'

import styles from './Bnpl.module.scss'

interface BnplProps {
  pageContext: GeneratedPageContext
}
export default function Bnpl({ pageContext }: BnplProps) {
  const breadcrumbs = pageContext.breadcrumb.crumbs

  return (
    <LayoutTemplate>
      {breadcrumbs && <BreadcrumbsSEO breadcrumbs={breadcrumbs} />}
      <HeroSection
        className={styles.heroSection}
        title='Buy now, pay later fraud prevention'
        ctaText='Contact us'
        ctaHref={PATH.contactSales}
        variant='secondary'
      >
        Increase approval rates and minimize fraud losses with high accuracy device identification.
      </HeroSection>
      <ClientsSection />
      <BenefitsSection />
      <Container size='large'>
        <BannerWithCTA
          title='Free PDF: Preventing BNPL Fraud'
          ctaText='Download'
          ctaHref='https://try.fingerprint.com/en-us/free-pdf-preventing-buy-now-pay-later-fraud-with-fingerprintjs'
          variant='white'
          className={styles.ctaSection}
          openNewTab
        >
          Get an in-depth look at how to prevent fraud in this $100 billion industry with Fingerprint in our free PDF
          download.
        </BannerWithCTA>
      </Container>
    </LayoutTemplate>
  )
}

export function Head(props: HeadProps) {
  return (
    <SEO
      pathname={props.location.pathname}
      title='Buy Now, Pay Later Fraud Prevention - Fingerprint'
      description="Increase approval rates and minimize fraud losses with Fingerprint Pro's high accuracy device identification."
    />
  )
}
