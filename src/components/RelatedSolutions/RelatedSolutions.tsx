import { graphql, StaticQuery } from 'gatsby'
import React from 'react'
import { ArrayElement } from '../../helpers/types'
import { mapToSolution, SolutionProps } from '../solutions/Solution/Solution'
import Solutions from '../solutions/Solutions/Solutions'

export interface RelatedSolutionsProps {
  solution: SolutionProps
}
export default function RelatedSolutions({ solution }: RelatedSolutionsProps) {
  return (
    <StaticQuery<GatsbyTypes.RelatedSolutionsQuery>
      query={relatedSolutionsQuery}
      render={(data) => {
        const allSolutions = data.allMarkdownRemark.edges.map(({ node }) => node)
        const relatedSolutions = getRelatedSolutions(solution, allSolutions)
        return relatedSolutions.length > 0 ? (
          <Solutions solutions={relatedSolutions} title={'Explore more technical solutions'} />
        ) : null
      }}
    />
  )
}

const relatedSolutionsQuery = graphql`
  query RelatedSolutions {
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: {regex: "/(solutions)/(solutions).*\\.md$/"}
        frontmatter: { isPublished: {ne: false}, isHidden: {ne: true} }
      }
      sort: { order: DESC, fields: frontmatter___publishDate }
      limit: 1000
    ) {
      ...SolutionData
    }
  }
`

type SolutionQuery = NonNullable<
  ArrayElement<NonNullable<NonNullable<GatsbyTypes.RelatedSolutionsQuery['allMarkdownRemark']>['edges']>>['node']
>
function getRelatedSolutions(referenceSolution: SolutionProps, allSolutions: SolutionQuery[]): SolutionProps[] {
  const relatedSolutions = allSolutions.map((solution) => mapToSolution(solution))
  const referenceTags = [...referenceSolution.funnel, ...referenceSolution.category, ...referenceSolution.industry]
  const similarity: Record<string, number> = {}

  relatedSolutions.forEach((solution) => {
    const { path, tags = [] } = solution
    similarity[path] = tags.filter((tag) => referenceTags.includes(tag)).length
  })
  return relatedSolutions
    .filter((solution) => similarity[solution.path] > 0 && solution.path !== referenceSolution.path)
    .sort((a, b) => {
      return similarity[b.path] - similarity[a.path]
    })
    .slice(0, 4)
}
