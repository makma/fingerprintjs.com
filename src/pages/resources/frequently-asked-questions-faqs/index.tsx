import React from 'react'

import { GeneratedPageContext } from '../../../helpers/types'

import { graphql, HeadProps } from 'gatsby'
import { SEO } from '../../../components/SEO/SEO'
import { LayoutTemplate } from '../../../components/Layout'
import Container from '../../../components/common/Container'
import Section from '../../../components/common/Section'
import BreadcrumbsSEO from '../../../components/Breadcrumbs/BreadcrumbsSEO'
import { scrollToElementById } from '../../../helpers/scrollToElementByID'
import { FAQBlock, Faqs } from '../../../components/FaqBlock/FaqBlock'
import styles from './Faq.module.scss'

interface FaqPageProps {
  data: Queries.FaqBlocksQuery
  pageContext: GeneratedPageContext
}
export default function FaqPage({ data, pageContext }: FaqPageProps) {
  const breadcrumbs = pageContext.breadcrumb.crumbs
  const faqs = data.allMarkdownRemark.nodes[0].frontmatter?.faqBlocks as Faqs[]
  return (
    <LayoutTemplate>
      {breadcrumbs && <BreadcrumbsSEO breadcrumbs={breadcrumbs} />}
      <Section className={styles.section}>
        <Container size='large' className={styles.container}>
          <header className={styles.header}>
            <h2 className={styles.title}>Frequently Asked Questions</h2>
          </header>
          <>
            <ul className={styles.toc}>
              {faqs.map((faq) => (
                <li className={styles.item} key={faq.id}>
                  <a className={styles.itemLink} onClick={() => scrollToElementById(faq.id)}>
                    {faq.title}
                  </a>
                </li>
              ))}
            </ul>
            <FAQBlock faqBlocks={faqs} />
          </>
        </Container>
      </Section>
    </LayoutTemplate>
  )
}

export const pageQuery = graphql`
  query FaqBlocks {
    allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "faq-page" } } }) {
      nodes {
        frontmatter {
          faqBlocks {
            id
            title
            faq {
              answer
              question
            }
          }
        }
      }
    }
  }
`

export function Head(props: HeadProps) {
  return (
    <SEO
      pathname={props.location.pathname}
      title='Frequently Asked Questions - Fingerprint Pro'
      description='Get answers to your questions about our open-source product, our premium product Fingerprint Pro, the basics of browser fingerprinting, device fingerprints, common types of fraud, and more.'
    />
  )
}
