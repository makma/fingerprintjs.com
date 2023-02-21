import { graphql, HeadProps } from 'gatsby'
import React from 'react'
import { LayoutTemplate } from '../components/Layout'
import Container from '../components/common/Container'
import { mapToPost } from '../components/Post/Post'
import Posts from '../components/Posts/Posts'
import { GeneratedPageContext } from '../helpers/types'
import PaginationNav from '../components/PaginationNav/PaginationNav'
import BreadcrumbsSEO from '../components/Breadcrumbs/BreadcrumbsSEO'
import AuthorSummary from '../components/AuthorSummary/AuthorSummary'
import { normalizeWord } from '../helpers/url'
import { SEO } from '../components/SEO/SEO'

import styles from './author.module.scss'

interface AuthorProps {
  data: Queries.BlogAuthorQuery
  pageContext: AuthorContext
}
export default function Author({ data, pageContext }: AuthorProps) {
  const { edges: posts } = data.posts
  const bio = data.authorData?.frontmatter?.bio
  const photo = data.authorData?.frontmatter?.photo?.childImageSharp?.gatsbyImageData
  const role = data.authorData?.frontmatter?.role
  const tags = data.posts.group.map(({ tag }) => tag) as string[]

  const { currentPage, numPages, author } = pageContext
  const breadcrumbs = pageContext.breadcrumb.crumbs.filter(({ pathname }) => pathname !== '/blog/author')

  return (
    <LayoutTemplate>
      {breadcrumbs && <BreadcrumbsSEO breadcrumbs={breadcrumbs} />}

      <Container size='large' className={styles.authorSection}>
        <AuthorSummary author={author} role={role} bio={bio} photo={photo} />
        <Posts
          name={`${author}'s Articles`}
          posts={posts.map(({ node }) => mapToPost(node))}
          tags={tags}
          perRow={3}
          tagLink={`/blog/author/${normalizeWord(author)}/`}
        />

        <PaginationNav
          currentPage={currentPage}
          numPages={numPages}
          basePath={`/blog/author/${normalizeWord(author)}/`}
        />
      </Container>
    </LayoutTemplate>
  )
}

export const pageQuery = graphql`
  query BlogAuthor($skip: Int!, $limit: Int!, $author: String) {
    posts: allMarkdownRemark(
      filter: {fileAbsolutePath: {regex: "/(blog)/.*\\.md$/"}, frontmatter: {authors: {in: [$author]}, templateKey: {eq: "long-form-content"}, isPublished: {ne: false}, isHidden: {ne: true}}}
      sort: {order: DESC, fields: frontmatter___publishDate}
      limit: $limit
      skip: $skip
    ) {
      ...PostData
      group(field: frontmatter___tags) {
       tag: fieldValue
      }
    }
    authorData: markdownRemark(frontmatter: {title: {eq: $author}}) {
      frontmatter {
        bio
        role
        photo {
          childImageSharp {
            gatsbyImageData(width: 128,height: 128, placeholder: BLURRED, formats: [AUTO])
          }
        }
      }
    }
  }
`

interface AuthorContext extends GeneratedPageContext {
  currentPage: number
  numPages: number
  author: string
}

export function Head(props: HeadProps<Queries.BlogAuthorQuery, AuthorContext>) {
  return (
    <SEO
      pathname={props.location.pathname}
      title={`${props.pageContext.author}'s Articles - Fingerprint Blog | Fingerprint`}
      description={`We are an open source powered company working to prevent online fraud for websites of all sizes. Read our articles written by ${props.pageContext.author} on our blog.`}
    />
  )
}
