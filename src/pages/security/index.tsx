import React from 'react'
import { LayoutTemplate } from '../../components/Layout'
import BreadcrumbsSEO from '../../components/Breadcrumbs/BreadcrumbsSEO'
import { GeneratedPageContext } from '../../helpers/types'

import HeroSection from '../../components/security/HeroSection/HeroSection'
import CardsSection from '../../components/security/CardsSection/CardsSection'
import CertificationsSection from '../../components/security/CertificationsSection/CertificationsSection'
import BannerWithCTA from '../../components/BannerWithCTA/BannerWithCTA'

import Container from '../../components/common/Container'
import { PATH } from '../../constants/content'

import { HeadProps } from 'gatsby'
import { SEO } from '../../components/SEO/SEO'

import styles from './Security.module.scss'

interface SecurityProps {
  pageContext: GeneratedPageContext
}
export default function Security({ pageContext }: SecurityProps) {
  const breadcrumbs = pageContext.breadcrumb.crumbs

  return (
    <LayoutTemplate>
      {breadcrumbs && <BreadcrumbsSEO breadcrumbs={breadcrumbs} />}
      <HeroSection />
      <CardsSection />
      <CertificationsSection />

      <Container size='large'>
        <BannerWithCTA
          title='Detect and prevent fraud with Fingerprint Pro'
          ctaText='Learn More'
          ctaHref={PATH.demoUrl}
          className={styles.ctaSection}
        >
          Learn how Fingerprint Pro can help your business build a custom solution to detect and prevent fraud attempts.
        </BannerWithCTA>
      </Container>
    </LayoutTemplate>
  )
}

export function Head(props: HeadProps) {
  return (
    <SEO
      pathname={props.location.pathname}
      title='Security at Fingerprint'
      description='Fingerprint upholds enterprise-grade certifications such as SOC2, global data centers, maintain a 99.9% uptime in addition to several other certifications and features as part of our ongoing Security program.'
    />
  )
}
