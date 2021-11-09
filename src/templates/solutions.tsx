import { graphql, Link } from 'gatsby'
import React from 'react'
import Section from '../components/common/Section'
import { LayoutTemplate } from '../components/Layout'
import Container from '../components/common/Container'
import Solution,{} from '../components/Solution/Solution'
import PaginationNav from '../components/PaginationNav/PaginationNav'
import useSiteMetadata from '../hooks/useSiteMetadata'
import { useLocation } from '@reach/router'

import styles from './blog.module.scss'

interface SolutionsProps {
  data: GatsbyTypes.BlogQuery
}
export default function Solutions({ data }: SolutionsProps) {
  const { edges: posts } = data.posts
  const tags = data.tags.group.map(({ tag }) => tag) as string[]
  const { pathname } = useLocation()
  let siteMetadata = useSiteMetadata()
  siteMetadata = {
    ...siteMetadata,
    title: 'FingerprintJS Blog | FingerprintJS',
    description:
      'We are an open source powered company working to prevent online fraud for websites of all sizes. Learn about our browser fingerprinting API and more on our blog.',
    siteUrl: `${siteMetadata.siteUrl}${pathname}`,
  }

  return (
    <LayoutTemplate siteMetadata={siteMetadata}>
      <Section>
        <Container size='large'>
          <h1>Blog Articles</h1>

          {isFirst && <Featured featuredPosts={featuredPosts.map(({ node }) => node).map((node) => mapToPost(node))} />}
          <PostGrid
            name='All Articles'
            posts={posts.map(({ node }) => node).map((node) => mapToPost(node))}
            tags={tags}
            perRow='three'
          />

          <PaginationNav currentPage={currentPage} numPages={numPages} basePath='/blog/' />
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
        frontmatter: { isPublished: {ne: false} } 
      }        
      sort: { order: DESC, fields: frontmatter___publishDate }
      limit: $limit
      skip: $skip
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

function Featured({ featuredPost }: { featuredPosts: Array<PostProps> }) {
  const hasMainFeaturedPost = featuredPosts.length > 0
  const hasFeaturedPosts = featuredPosts.length - 1 > 0

  return (
    <div>
      {hasMainFeaturedPost && <Post {...featuredPosts[0]} variant='wide' />}
      {hasFeaturedPosts && (
        <PostGrid
          name='Featured'
          posts={featuredPosts.slice(1)}
          link={
            <Link to='/blog/featured/' className={styles.link}>
              See all →
            </Link>
          }
        />
      )}
    </div>
  )
}
