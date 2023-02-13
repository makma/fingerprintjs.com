import { graphql, HeadProps } from 'gatsby'
import React from 'react'
import { LayoutTemplate } from '../../components/Layout'
import { mapToUseCase } from '../../components/useCases/UseCase/UseCase'
import UseCasesSection from '../../components/useCases/UseCasesSection/UseCasesSection'
import { SEO } from '../../components/SEO/SEO'

interface UseCasesProps {
  data: Queries.UseCaseQuery
}
export default function UseCases({ data }: UseCasesProps) {
  const { edges: useCases } = data.useCases
  const funnelTags = data.funnel.group.map(({ tag }) => tag) as string[]
  const categoryTags = data.category.group.map(({ tag }) => tag) as string[]
  const industryTags = data.industry.group.map(({ tag }) => tag) as string[]

  return (
    <LayoutTemplate>
      <UseCasesSection
        useCases={useCases.map(({ node }) => node).map((node) => mapToUseCase(node))}
        funnelTags={funnelTags}
        categoryTags={categoryTags}
        industryTags={industryTags}
      />
    </LayoutTemplate>
  )
}

export const pageQuery = graphql`query UseCase {
  useCases: allMarkdownRemark(
    filter: {fileAbsolutePath: {regex: "/(use-cases)/(use-cases).*\\.md$/"}, frontmatter: {isPublished: {ne: false}}}
    sort: {frontmatter: {publishDate: DESC}}
  ) {
    ...UseCaseData
  }
  funnel: allMarkdownRemark(filter: {frontmatter: {isPublished: {ne: false}}}) {
    group(field: {frontmatter: {funnel: SELECT}}) {
      tag: fieldValue
    }
  }
  category: allMarkdownRemark(filter: {frontmatter: {isPublished: {ne: false}}}) {
    group(field: {frontmatter: {category: SELECT}}) {
      tag: fieldValue
    }
  }
  industry: allMarkdownRemark(filter: {frontmatter: {isPublished: {ne: false}}}) {
    group(field: {frontmatter: {industry: SELECT}}) {
      tag: fieldValue
    }
  }
}`
export function Head(props: HeadProps) {
  return (
    <SEO
      pathname={props.location.pathname}
      title='Use Cases - Fingerprint Pro'
      description='Solve any fraud problem with our user identification API. Explore our full code use cases for payment fraud, account takeover and more.'
    />
  )
}
