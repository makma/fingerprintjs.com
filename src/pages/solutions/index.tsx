import { graphql } from 'gatsby'
import React from 'react'
import { LayoutTemplate } from '../../components/Layout'
import useSiteMetadata from '../../hooks/useSiteMetadata'
import { useLocation } from '@reach/router'
import HeroSection from '../../components/solutions/HeroSection/HeroSection'
import PostGrid from '../../components/PostGrid/PostGrid'
import { mapToPost } from '../../components/Post/Post'
import Container from '../../components/common/Container'

import styles from './Solutions.module.scss'

interface SolutionsProps {
  data: GatsbyTypes.SolutionQuery
}
export default function Solutions({ data }: SolutionsProps) {
  const { edges: posts } = data.posts
  const tags = data.tags.group.map(({ tag }) => tag) as string[]
  const { pathname } = useLocation()
  let siteMetadata = useSiteMetadata()
  siteMetadata = {
    ...siteMetadata,
    title: 'FingerprintJS Solutions | FingerprintJS',
    description:
      'We are an open source powered company working to prevent online fraud for websites of all sizes. Learn about our browser fingerprinting API and more on our blog.',
    siteUrl: `${siteMetadata.siteUrl}${pathname}`,
  }
  return (
    <LayoutTemplate siteMetadata={siteMetadata}>
      <HeroSection />
      <Container size={'large'} className={styles.gridContainer}>
        <PostGrid
          posts={posts.map(({ node }) => node).map((node) => mapToPost(node))}
          tags={tags}
          perRow='three'
          variant='solutions'
        />
      </Container>
    </LayoutTemplate>
  )
}

export const pageQuery = graphql`
  query Solution {
    posts: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/(blog)/.*\\.md$/" }
        frontmatter: { isPublished: {ne: false} } 
      }        
      sort: { order: DESC, fields: frontmatter___publishDate }
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
