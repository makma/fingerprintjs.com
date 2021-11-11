import { graphql } from 'gatsby'
import React from 'react'
import { LayoutTemplate } from '../../components/Layout'
import useSiteMetadata from '../../hooks/useSiteMetadata'
import { useLocation } from '@reach/router'
import HeroSection from '../../components/solutions/HeroSection/HeroSection'
import { mapToSolution } from '../../components/solutions/Solution/Solution'
import SolutionsSection from '../../components/solutions/SolutionsSection/SolutionsSection'

interface SolutionsProps {
  data: GatsbyTypes.SolutionQuery
}
export default function Solutions({ data }: SolutionsProps) {
  const { edges: solutions } = data.solutions
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
      <SolutionsSection solutions={solutions.map(({ node }) => node).map((node) => mapToSolution(node))} tags={tags} />
    </LayoutTemplate>
  )
}

export const pageQuery = graphql`
  query Solution {
    solutions: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/(blog)/.*\\.md$/" }
        frontmatter: { isPublished: {ne: false} } 
      }        
      sort: { order: DESC, fields: frontmatter___publishDate }
    ) {
      ...SolutionData
    }

    tags: allMarkdownRemark {
        group(field: frontmatter___tags) {
          tag: fieldValue
        }
      }
  }
`
