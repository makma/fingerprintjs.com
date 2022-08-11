import { graphql } from 'gatsby'
import React from 'react'
import { LayoutTemplate } from '../../components/Layout'
import useSiteMetadata from '../../hooks/useSiteMetadata'
import { useLocation } from '@reach/router'
import { mapToUseCase } from '../../components/useCases/UseCase/UseCase'
import UseCasesSection from '../../components/useCases/UseCasesSection/UseCasesSection'

interface UseCasesProps {
  data: GatsbyTypes.UseCaseQuery
}
export default function UseCases({ data }: UseCasesProps) {
  const { edges: useCases } = data.useCases
  const funnelTags = data.funnel.group.map(({ tag }) => tag) as string[]
  const categoryTags = data.category.group.map(({ tag }) => tag) as string[]
  const industryTags = data.industry.group.map(({ tag }) => tag) as string[]

  const { pathname } = useLocation()
  let siteMetadata = useSiteMetadata()
  siteMetadata = {
    ...siteMetadata,
    title: 'Use Cases - Fingerprint Pro',
    description:
      'Solve any fraud problem with our user identification API. Explore our full code use cases for payment fraud, account takeover and more.',
    siteUrl: `${siteMetadata.siteUrl}${pathname}`,
  }
  return (
    <LayoutTemplate siteMetadata={siteMetadata}>
      <UseCasesSection
        useCases={useCases.map(({ node }) => node).map((node) => mapToUseCase(node))}
        funnelTags={funnelTags}
        categoryTags={categoryTags}
        industryTags={industryTags}
      />
    </LayoutTemplate>
  )
}

export const pageQuery = graphql`
  query UseCase {
    useCases: allMarkdownRemark(
      filter: {
        fileAbsolutePath: {regex: "/(use-cases)/(use-cases).*\\.md$/"}
        frontmatter: { isPublished: {ne: false} } 
      }        
      sort: { order: DESC, fields: frontmatter___publishDate }
    ) {
      ...UseCaseData
    }
    funnel: allMarkdownRemark(filter: {frontmatter: {isPublished: {ne: false}}}) {
        group(field: frontmatter___funnel) {
          tag: fieldValue
        }
      }   
    category: allMarkdownRemark(filter: {frontmatter: {isPublished: {ne: false}}}) {
      group(field: frontmatter___category) {
        tag: fieldValue
      }
    }  
    industry: allMarkdownRemark(filter: {frontmatter: {isPublished: {ne: false}}}) {
      group(field: frontmatter___industry) {
        tag: fieldValue
      }
    }   
  }
`
