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
  const funnelTags = data.funnel.group.map(({ tag }) => tag) as string[]
  const categoryTags = data.category.group.map(({ tag }) => tag) as string[]
  const industryTags = data.industry.group.map(({ tag }) => tag) as string[]

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
      <SolutionsSection
        solutions={solutions.map(({ node }) => node).map((node) => mapToSolution(node))}
        funnel={funnelTags}
        category={categoryTags}
        industry={industryTags}
      />
    </LayoutTemplate>
  )
}

export const pageQuery = graphql`
  query Solution {
    solutions: allMarkdownRemark(
      filter: {
        fileAbsolutePath: {regex: "/(solutions)/(solutions).*\\.md$/"}
        frontmatter: { isPublished: {ne: false} } 
      }        
      sort: { order: DESC, fields: frontmatter___publishDate }
    ) {
      ...SolutionData
    }
    funnel: allMarkdownRemark {
        group(field: frontmatter___funnel) {
          tag: fieldValue
        }
      }   
    category: allMarkdownRemark {
      group(field: frontmatter___category) {
        tag: fieldValue
      }
    }  
    industry: allMarkdownRemark {
      group(field: frontmatter___industry) {
        tag: fieldValue
      }
    }   
  }
`
