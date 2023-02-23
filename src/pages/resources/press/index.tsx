import React from 'react'
import { LayoutTemplate } from '../../../components/Layout'
import BreadcrumbsSEO from '../../../components/Breadcrumbs/BreadcrumbsSEO'
import { GeneratedPageContext } from '../../../helpers/types'

import PressReleasesSection, { CardProps } from '../../../components/press/PressReleasesSection/PressReleasesSection'
import TimelineSection from '../../../components/press/TimelineSection/TimelineSection'
import BrandAssetsSection from '../../../components/press/BrandAssetsSection/BrandAssetsSection'
import ReachTeamSection from '../../../components/press/ReachTeamSection/ReachTeamSection'

import { useStaticQuery, graphql, HeadProps } from 'gatsby'
import { SEO } from '../../../components/SEO/SEO'

interface SecurityProps {
  pageContext: GeneratedPageContext
}
export default function Security({ pageContext }: SecurityProps) {
  const breadcrumbs = pageContext.breadcrumb.crumbs

  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "press-page" } } }) {
        nodes {
          frontmatter {
            pressReleases {
              title
              url
              website
            }
            news {
              title
              url
              website
            }
          }
        }
      }
    }
  `)
  const pressReleasesCards = data.allMarkdownRemark.nodes[0].frontmatter.pressReleases as CardProps[]
  const newsCards = data.allMarkdownRemark.nodes[0].frontmatter.news as CardProps[]
  return (
    <LayoutTemplate>
      {breadcrumbs && <BreadcrumbsSEO breadcrumbs={breadcrumbs} />}
      <PressReleasesSection pressReleasesCards={pressReleasesCards} newsCards={newsCards} />
      <TimelineSection />
      <BrandAssetsSection />
      <ReachTeamSection />
    </LayoutTemplate>
  )
}

export function Head(props: HeadProps) {
  return (
    <SEO
      pathname={props.location.pathname}
      title='Fingerprint Press & Brand Resources - Logos and Recent News'
      description='Visit the Fingerprint Press and Brand Resources. This page includes recent news and media coverage, the company story, and downloadable brand guidelines and logos.'
    />
  )
}
