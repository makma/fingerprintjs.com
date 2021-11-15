import { graphql } from 'gatsby'
import React from 'react'
import Container from '../components/common/Container'
import Section from '../components/common/Section'
import { LayoutTemplate } from '../components/Layout'
import { GeneratedPageContext } from '../helpers/types'
import { useLocation } from '@reach/router'
import useSiteMetadata from '../hooks/useSiteMetadata'
import PaginationNav from '../components/PaginationNav/PaginationNav'
import { mapToPost } from '../components/Post/Post'
import Posts from '../components/Posts/Posts'
import BreadcrumbsSEO from '../components/Breadcrumbs/BreadcrumbsSEO'

interface CaseStudyProps {
  data: GatsbyTypes.CaseStudiesQuery
  pageContext: CaseStudiesContext
}
export default function CaseStudies({ data, pageContext }: CaseStudyProps) {
  const { edges: posts } = data.posts
  const breadcrumbs = pageContext.breadcrumb.crumbs

  const { pathname } = useLocation()
  let siteMetadata = useSiteMetadata()
  siteMetadata = {
    ...siteMetadata,
    title: 'FingerprintJS Case Studies | FingerprintJS',
    description: 'Success stories from our customers.',
    siteUrl: `${siteMetadata.siteUrl}${pathname}`,
  }

  const { currentPage, numPages } = pageContext

  return (
    <LayoutTemplate siteMetadata={siteMetadata}>
      {breadcrumbs && <BreadcrumbsSEO breadcrumbs={breadcrumbs} />}

      <Section>
        <Container size='large'>
          <h1>Case Studies</h1>

          <Posts posts={posts.map(({ node }) => node).map((node) => mapToPost(node))} perRow={4} />

          <PaginationNav currentPage={currentPage} numPages={numPages} basePath='/case-studies/' />
        </Container>
      </Section>
    </LayoutTemplate>
  )
}

export const pageQuery = graphql`
  query CaseStudies($skip: Int!, $limit: Int!) {
    posts: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/(case-study)/.*\\.md$/" } }
      limit: $limit
      skip: $skip
    ) {
      ...PostData
    }
  }
`

interface CaseStudiesContext extends GeneratedPageContext {
  currentPage: number
  numPages: number
}
