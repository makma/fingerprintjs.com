import { graphql, HeadProps } from 'gatsby'
import React from 'react'
import Section from '../components/common/Section'
import { LayoutTemplate } from '../components/Layout'
import Container from '../components/common/Container'
import Post, { mapToPost, PostProps } from '../components/Post/Post'
import Posts from '../components/Posts/Posts'
import PaginationNav from '../components/PaginationNav/PaginationNav'
import NewsletterBanner from '../components/NewsletterBanner/NewsletterBanner'
import { GeneratedPageContext } from '../helpers/types'
import { SEO } from '../components/SEO/SEO'

import styles from './blog.module.scss'

interface BlogProps {
  data: Queries.BlogQuery
  pageContext: BlogContext
}
export default function Blog({ data, pageContext }: BlogProps) {
  const { edges: posts } = data.posts
  const { edges: featuredPostsEdges } = data.featuredPosts
  const featuredPosts: Array<PostProps> = featuredPostsEdges.map(({ node }) => mapToPost(node))

  const tags = data.tags.group.map(({ tag }) => tag) as string[]

  const { currentPage, numPages } = pageContext
  const isFirst = currentPage === 1

  return (
    <LayoutTemplate>
      <Section className={styles.root}>
        <Container size='large'>
          <h2 className={styles.title}>Blog Articles</h2>

          {isFirst && featuredPosts.length > 0 && <Post {...featuredPosts[0]} variant='wide' />}
          <Posts
            name='All Articles'
            posts={posts.map(({ node }) => node).map((node) => mapToPost(node))}
            tags={tags}
            perRow={3}
          />

          <PaginationNav currentPage={currentPage} numPages={numPages} basePath='/blog/' className={styles.buttons} />
          <NewsletterBanner />
        </Container>
      </Section>
    </LayoutTemplate>
  )
}

export const pageQuery = graphql`
  query Blog($skip: Int!, $limit: Int!) {
    posts: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/(blog)/.*\\.md$/" }
        frontmatter: { isPublished: {ne: false}, isHidden: {ne: true} } 
      }        
      sort: { order: DESC, fields: frontmatter___publishDate }
      limit: $limit
      skip: $skip
    ) {
      ...PostData
    }

    featuredPosts: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/(blog)/.*\\.md$/" }
        frontmatter: { featured: { eq: true }, isPublished: {ne: false}, isHidden: {ne: true} }
      }
      sort: { order: DESC, fields: frontmatter___publishDate }
      limit: 5
    ) {
      ...PostData
    }

    tags: allMarkdownRemark {
        group(field: frontmatter___tags) {
          tag: fieldValue
        }
      }
  }
`

interface BlogContext extends GeneratedPageContext {
  currentPage: number
  numPages: number
}

export function Head(props: HeadProps) {
  return (
    <SEO
      pathname={props.location.pathname}
      title='Fingerprint Blog | Fingerprint'
      description='We are an open source powered company working to prevent online fraud for websites of all sizes. Learn about our browser fingerprinting API and more on our blog.'
    />
  )
}
