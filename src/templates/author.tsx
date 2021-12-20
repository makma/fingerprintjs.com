import { graphql } from 'gatsby'
import React from 'react'
import { LayoutTemplate } from '../components/Layout'
import Container from '../components/common/Container'
import { mapToPost } from '../components/Post/Post'
import Posts from '../components/Posts/Posts'
import { GeneratedPageContext } from '../helpers/types'
import PaginationNav from '../components/PaginationNav/PaginationNav'
import BreadcrumbsSEO from '../components/Breadcrumbs/BreadcrumbsSEO'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import useSiteMetadata from '../hooks/useSiteMetadata'
import { GatsbyImage } from 'gatsby-plugin-image'
import { useLocation } from '@reach/router'

import styles from './author.module.scss'

interface AuthorProps {
  data: GatsbyTypes.BlogAuthorQuery
  pageContext: AuthorContext
}
export default function Author({ data, pageContext }: AuthorProps) {
  const { edges: posts } = data.posts
  const bio = data.authorData?.frontmatter?.bio ?? null
  const photo = data.authorData?.frontmatter?.photo?.childImageSharp?.gatsbyImageData
  const role = data.authorData?.frontmatter?.role

  const { currentPage, numPages, author } = pageContext
  const breadcrumbs = pageContext.breadcrumb.crumbs.filter(({ pathname }) => pathname !== '/blog/author')
  const { pathname } = useLocation()
  let siteMetadata = useSiteMetadata()
  siteMetadata = {
    ...siteMetadata,
    title: `${author} Articles - FingerprintJS Blog | FingerprintJS`,
    description: `We are an open source powered company working to prevent online fraud for websites of all sizes. Read our articles written by ${author} on our blog.`,
    siteUrl: `${siteMetadata.siteUrl}${pathname}`,
  }

  return (
    <LayoutTemplate siteMetadata={siteMetadata}>
      {breadcrumbs && (
        <Container size='large'>
          <BreadcrumbsSEO breadcrumbs={breadcrumbs} />
          <Breadcrumbs breadcrumbs={breadcrumbs.slice(1)} />
        </Container>
      )}

      <Container size='large' className={styles.authorSection}>
        <h1 className={styles.aboutAuthor}>About {author} </h1>
        <div className={styles.authorSummary}>
          <div>
            {photo && (
              <GatsbyImage image={photo} alt={`${author} photo`} title={`${author} photo`} className={styles.photo} />
            )}
          </div>
          <div className={styles.authorInfo}>
            <h3 className={styles.title}>Role</h3>
            <span className={styles.description}>{role}</span>
            {bio && (
              <>
                <h3 className={styles.bioTitle}>Bio</h3>
                <span className={styles.description}>{bio}</span>
              </>
            )}
          </div>
        </div>

        <Posts
          name={`${author} Articles`}
          posts={posts
            .map(({ node }) => node)
            .map((node) => mapToPost(node))
            .map((post) => ({ ...post }))}
        />

        <PaginationNav currentPage={currentPage} numPages={numPages} basePath={`/blog/author/${author}/`} />
      </Container>
    </LayoutTemplate>
  )
}

export const pageQuery = graphql`
  query BlogAuthor($skip: Int!, $limit: Int!, $author: String) {
    posts: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/(blog)/.*\\.md$/" }
        frontmatter: { authors: { in: [$author] }, templateKey: {eq: "long-form-content"}, isPublished: {ne: false} }
      }
      sort: { order: DESC, fields: frontmatter___publishDate }
      limit: $limit
      skip: $skip
    ) {
      ...PostData
    }
    authorData: markdownRemark(frontmatter: {title: {eq: $author}}) {
      frontmatter {
        bio
        role
        photo {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, quality: 100, layout: FULL_WIDTH)
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
