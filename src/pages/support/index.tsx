import React from 'react'
import { LayoutTemplate } from '../../components/Layout'
import BreadcrumbsSEO from '../../components/Breadcrumbs/BreadcrumbsSEO'
import { GeneratedPageContext } from '../../helpers/types'
import ContactSupportForm from '../../components/ContactSupportForm/ContactSupportForm'
import Container from '../../components/common/Container'
import Section from '../../components/common/Section'

import useSiteMetadata from '../../hooks/useSiteMetadata'
import { useLocation } from '@reach/router'

import styles from './Support.module.scss'

interface SupportProps {
  pageContext: GeneratedPageContext
}
export default function Support({ pageContext }: SupportProps) {
  const breadcrumbs = pageContext.breadcrumb.crumbs
  const { pathname } = useLocation()
  let siteMetadata = useSiteMetadata()
  siteMetadata = {
    ...siteMetadata,
    title: 'Contact Support - Fingerprint',
    siteUrl: `${siteMetadata.siteUrl}${pathname}`,
  }

  return (
    <LayoutTemplate siteMetadata={siteMetadata}>
      {breadcrumbs && <BreadcrumbsSEO breadcrumbs={breadcrumbs} />}

      <Section className={styles.root}>
        <Container size='large' className={styles.container}>
          <ContactSupportForm />
        </Container>
      </Section>
    </LayoutTemplate>
  )
}
