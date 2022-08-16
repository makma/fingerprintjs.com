import React from 'react'
import { LayoutTemplate } from '../../components/Layout'
import BreadcrumbsSEO from '../../components/Breadcrumbs/BreadcrumbsSEO'
import { GeneratedPageContext } from '../../helpers/types'
import ContactSupportForm from '../../components/ContactSupportForm/ContactSupportForm'
import Container from '../../components/common/Container'
import Section from '../../components/common/Section'

import { HeadProps } from 'gatsby'
import { SEO } from '../../components/SEO/SEO'

import styles from './Support.module.scss'

interface SupportProps {
  pageContext: GeneratedPageContext
}
export default function Support({ pageContext }: SupportProps) {
  const breadcrumbs = pageContext.breadcrumb.crumbs

  return (
    <LayoutTemplate>
      {breadcrumbs && <BreadcrumbsSEO breadcrumbs={breadcrumbs} />}

      <Section className={styles.root}>
        <Container size='large' className={styles.container}>
          <ContactSupportForm />
        </Container>
      </Section>
    </LayoutTemplate>
  )
}

export function Head(props: HeadProps) {
  return <SEO pathname={props.location.pathname} title='Contact Support - Fingerprint' />
}
