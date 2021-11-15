import React, { useState } from 'react'
import Solution, { SolutionProps } from '../Solution/Solution'
import Grid from '../../Grid/Grid'
import Container from '../../common/Container'
import classNames from 'classnames'
import { kebabToTitle, pluralize } from '../../../helpers/case'

import styles from './SolutionsSection.module.scss'

export interface SolutionsSectionProps {
  solutions: Array<SolutionProps>
  funnelTags: string[]
  categoryTags: string[]
  industryTags: string[]
}
export default function SolutionsSection({ solutions, funnelTags, categoryTags, industryTags }: SolutionsSectionProps) {
  const [selectedTags, setSelectedTags] = useState(new Set())
  const [filteredSolutions, setFilteredSolutions] = useState(solutions)
  const [fade, setFade] = useState(true)
  const [numberOfSolutions, setNumberOfSolutions] = useState(solutions.length)

  // Funnel has the value "Other" and we want to show it at the end of the list
  // Since it is the only value that matters its position in the list, we simply send it at the end
  if (funnelTags.includes('Other')) {
    funnelTags.splice(funnelTags.indexOf('Other'), 1)
    funnelTags.push('Other')
  }

  const handleSelectedTags = (tag?: string) => {
    const timeout = 400
    setFade(false)

    if (!tag) {
      setSelectedTags(new Set())
      setNumberOfSolutions(solutions.length)
      setTimeout(() => {
        setFilteredSolutions(solutions)
      }, timeout)
      return
    }

    const newSelectedTags = new Set(selectedTags)

    if (selectedTags.has(tag)) {
      newSelectedTags.delete(tag)
    } else {
      newSelectedTags.add(tag)
    }

    setSelectedTags(newSelectedTags)
    const filteredSolutions =
      newSelectedTags.size === 0
        ? solutions
        : solutions.filter((solution) => solution.tags?.some((tag) => newSelectedTags.has(tag)))

    setNumberOfSolutions(filteredSolutions.length)
    setTimeout(() => {
      setFilteredSolutions(filteredSolutions)
    }, timeout)
  }

  return (
    <Container size={'large'} className={styles.gridContainer}>
      <div className={styles.solutionsRoot}>
        <section>
          <div className={styles.filterSection}>
            <span className={styles.showingSolutions}>
              Showing {pluralize(numberOfSolutions, 'solution')}
              {selectedTags.size > 0 && ` matching ${pluralize(selectedTags.size, 'filter')}`}
            </span>
            <span
              className={classNames(styles.filter, { [styles.hideFilter]: selectedTags.size === 0 })}
              onClick={() => handleSelectedTags()}
            >
              Clear all filters
            </span>
          </div>
          <div onTransitionEnd={() => setFade(true)}>
            <Grid
              items={filteredSolutions.map((solution) => {
                return <Solution key={solution.path} {...solution} />
              })}
              perRow={3}
              className={classNames(styles.solutionsGrid, { [styles.fadeOut]: !fade }, { [styles.fadeIn]: fade })}
            />
          </div>
        </section>

        <section className={styles.tags}>
          <span className={styles.tagCategory}>Funnel</span>
          <ul className={styles.tagSection}>
            {funnelTags.map((tag) => (
              <li key={tag} className={styles.item}>
                <button
                  className={classNames(styles.tag, { [styles.selectedTag]: selectedTags.has(tag) })}
                  onClick={() => handleSelectedTags(tag)}
                >
                  {kebabToTitle(tag)}
                </button>
              </li>
            ))}
          </ul>
          <span className={styles.tagCategory}>Category</span>
          <ul className={styles.tagSection}>
            {categoryTags.map((tag) => (
              <li key={tag} className={styles.item}>
                <button
                  className={classNames(styles.tag, { [styles.selectedTag]: selectedTags.has(tag) })}
                  onClick={() => handleSelectedTags(tag)}
                >
                  {kebabToTitle(tag)}
                </button>
              </li>
            ))}
          </ul>
          <span className={styles.tagCategory}>Industry</span>
          <ul className={styles.tagSection}>
            {industryTags.map((tag) => (
              <li key={tag} className={styles.item}>
                <button
                  className={classNames(styles.tag, { [styles.selectedTag]: selectedTags.has(tag) })}
                  onClick={() => handleSelectedTags(tag)}
                >
                  {kebabToTitle(tag)}
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Container>
  )
}
