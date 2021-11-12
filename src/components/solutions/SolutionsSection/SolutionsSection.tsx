import React, { useState } from 'react'
import Solution, { SolutionProps } from '../Solution/Solution'
import Grid from '../../Grid/Grid'
import Container from '../../common/Container'
import classNames from 'classnames'
import { kebabToTitle } from '../../../helpers/case'

import styles from './SolutionsSection.module.scss'

export interface SolutionsSectionProps {
  solutions: Array<SolutionProps>
  funnel: string[]
  category: string[]
  industry: string[]
}
export default function SolutionsSection({ solutions, funnel, category, industry }: SolutionsSectionProps) {
  const [selectedTags, setSelectedTags] = useState(new Set())
  const [filteredSolutions, setFilteredSolutions] = useState(solutions)
  const [fade, setFade] = useState(true)
  const [numberOfSolutions, setNumberOfSolutions] = useState(solutions.length)

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
              Showing {numberOfSolutions} {numberOfSolutions === 1 ? 'solution' : 'solutions'}
              {selectedTags.size > 0 &&
                ` matching ${selectedTags.size} ${selectedTags.size === 1 ? 'filter' : 'filters'}`}
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
              perRow='three'
              className={classNames(styles.solutionsGrid, { [styles.fadeOut]: !fade }, { [styles.fadeIn]: fade })}
            />
          </div>
        </section>

        <section className={styles.tags}>
          <span className={styles.tagCategory}>Funnel</span>
          <ul className={styles.tagSection}>
            {funnel.map((tag) => (
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
            {category.map((tag) => (
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
            {industry.map((tag) => (
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
