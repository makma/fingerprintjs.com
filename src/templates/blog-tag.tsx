import { graphql } from 'gatsby'
import React from 'react'
import Section from '../components/common/Section'
import { LayoutTemplate } from '../components/Layout'
import Container from '../components/common/Container'
import { mapToPost } from '../components/Post/Post'
import Posts from '../components/Posts/Posts'
import { GeneratedPageContext } from '../helpers/types'
import PaginationNav from '../components/PaginationNav/PaginationNav'
import { kebabToTitle } from '../helpers/case'
import BreadcrumbsSEO from '../components/Breadcrumbs/BreadcrumbsSEO'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import useSiteMetadata from '../hooks/useSiteMetadata'
import { useLocation } from '@reach/router'

interface BlogTagProps {
  data: GatsbyTypes.BlogTagQuery
  pageContext: BlogTagContext
}
export default function BlogTag({ data, pageContext }: BlogTagProps) {
  const { edges: posts } = data.allMarkdownRemark
  const { currentPage, numPages, tag } = pageContext
  const breadcrumbs = pageContext.breadcrumb.crumbs.filter(({ pathname }) => pathname !== '/blog/tag')
  const { pathname } = useLocation()
  let siteMetadata = useSiteMetadata()
  siteMetadata = {
    ...siteMetadata,
    title: `${kebabToTitle(tag)} Articles - FingerprintJS Blog | FingerprintJS`,
    description: `We are an open source powered company working to prevent online fraud for websites of all sizes. Read our articles on ${kebabToTitle(
      tag
    )} on our blog.`,
    siteUrl: `${siteMetadata.siteUrl}${pathname}`,
  }

  return (
    <LayoutTemplate siteMetadata={siteMetadata}>
      {breadcrumbs && (
        <>
          <BreadcrumbsSEO breadcrumbs={breadcrumbs} />
          <Container size='large'>
            <Breadcrumbs breadcrumbs={breadcrumbs.slice(1)} />
          </Container>
        </>
      )}

      <Section>
        <Container size='large'>
          <h1>{`${kebabToTitle(tag)}`} Articles</h1>

          <Posts
            posts={posts
              .map(({ node }) => node)
              .map((node) => mapToPost(node))
              .map((post) => ({ ...post, activeTag: tag }))}
          />

          <PaginationNav currentPage={currentPage} numPages={numPages} basePath={`/blog/tag/${tag}/`} />
        </Container>
      </Section>
    </LayoutTemplate>
  )
}

export const pageQuery = graphql`
  query BlogTag($skip: Int!, $limit: Int!, $tag: String) {
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/(blog)/.*\\.md$/" }
        frontmatter: { tags: { in: [$tag] }, templateKey: {eq: "long-form-content"}, isPublished: {ne: false} }
      }
      sort: { order: DESC, fields: frontmatter___publishDate }
      limit: $limit
      skip: $skip
    ) {
      ...PostData
    }
  }
`

interface BlogTagContext extends GeneratedPageContext {
  currentPage: number
  numPages: number
  tag: string
}
