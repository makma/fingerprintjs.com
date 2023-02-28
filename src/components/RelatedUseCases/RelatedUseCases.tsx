import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { ArrayElement } from '../../helpers/types'
import { mapToUseCase, UseCaseProps } from '../useCases/UseCase/UseCase'
import UseCases from '../useCases/UseCases/UseCases'

export interface RelatedUseCasesProps {
  useCase: UseCaseProps
}
export default function RelatedUseCases({ useCase }: RelatedUseCasesProps) {
  const data = useStaticQuery(graphql`query RelatedUseCases {
  allMarkdownRemark(
    filter: {fileAbsolutePath: {regex: "/(use-cases)/(use-cases).*\\.md$/"}, frontmatter: {isPublished: {ne: false}, isHidden: {ne: true}}}
    sort: {frontmatter: {publishDate: DESC}}
    limit: 1000
  ) {
    ...UseCaseData
  }
}`)
  const allUseCases = data.allMarkdownRemark.edges.map(({ node }) => node)
  const relatedUseCases = getRelatedUseCases(useCase, allUseCases)

  return relatedUseCases.length > 0 ? (
    <UseCases useCases={relatedUseCases} title={'Explore more technical use cases'} />
  ) : null
}

type UseCaseQuery = NonNullable<
  ArrayElement<NonNullable<NonNullable<Queries.RelatedUseCasesQuery['allMarkdownRemark']>['edges']>>['node']
>
function getRelatedUseCases(referenceUseCase: UseCaseProps, allUseCases: UseCaseQuery[]): UseCaseProps[] {
  const relatedUseCases = allUseCases.map((useCase) => mapToUseCase(useCase))
  const referenceTags = [...referenceUseCase.funnel, ...referenceUseCase.category, ...referenceUseCase.industry]
  const similarity: Record<string, number> = {}

  relatedUseCases.forEach((useCase) => {
    const { path, tags = [] } = useCase
    similarity[path] = tags.filter((tag) => referenceTags.includes(tag)).length
  })
  return relatedUseCases
    .filter((useCase) => similarity[useCase.path] > 0 && useCase.path !== referenceUseCase.path)
    .sort((a, b) => {
      return similarity[b.path] - similarity[a.path]
    })
    .slice(0, 4)
}
