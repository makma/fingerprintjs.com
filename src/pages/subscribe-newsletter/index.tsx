import React from 'react'
import { LayoutTemplate } from '../../components/Layout'
import BreadcrumbsSEO from '../../components/Breadcrumbs/BreadcrumbsSEO'
import { GeneratedPageContext } from '../../helpers/types'

import Container from '../../components/common/Container'
import Section from '../../components/common/Section'
import SubscribeNewsletterForm from '../../components/SubscribeNewsletterForm/SubscribeNewsletterForm'
import { Forms } from '../../hooks/useForm'

import { ReactComponent as LetterSVG } from '../../components/NewsletterBanner/LetterMobileSVG.svg'

import { HeadProps } from 'gatsby'
import { SEO } from '../../components/SEO/SEO'

import styles from './SubscribeNewsletter.module.scss'

interface SubscribeNewsletterProps {
  pageContext: GeneratedPageContext
}
export default function SubscribeNewsletter({ pageContext }: SubscribeNewsletterProps) {
  const breadcrumbs = pageContext.breadcrumb.crumbs

  return (
    <LayoutTemplate>
      {breadcrumbs && <BreadcrumbsSEO breadcrumbs={breadcrumbs} />}

      <Container size='large'>
        <Section className={styles.section}>
          <div className={styles.banner}>
            <div className={styles.iconSection}>
              <LetterSVG className={styles.letterIcon} />
            </div>
            <h1 className={styles.title}>Subscribe to newsletter</h1>
            <p className={styles.description}>Get updates about company news and new features of Fingerprint Pro.</p>
            <SubscribeNewsletterForm origin={Forms.NewsletterBanner} />
          </div>
        </Section>
      </Container>
    </LayoutTemplate>
  )
}

export function Head(props: HeadProps) {
  return <SEO pathname={props.location.pathname} title='Subscribe to newsletter - Fingerprint' />
}
