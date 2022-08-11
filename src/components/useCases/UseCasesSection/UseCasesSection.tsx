import React, { useState } from 'react'
import UseCase, { UseCaseProps } from '../UseCase/UseCase'
import Grid from '../../Grid/Grid'
import Container from '../../common/Container'
import classNames from 'classnames'
import { kebabToTitle, pluralize } from '../../../helpers/case'
import styles from './UseCasesSection.module.scss'
import { useLocation } from '@reach/router'

export interface UseCasesSectionProps {
  useCases: Array<UseCaseProps>
  funnelTags: string[]
  categoryTags: string[]
  industryTags: string[]
}
interface selectedTag {
  selectedTag?: string
}

export default function UseCasesSection({ useCases, funnelTags, categoryTags, industryTags }: UseCasesSectionProps) {
  const locationState = useLocation().state as selectedTag
  const tagFromState = locationState?.selectedTag
  const initialUseCases = tagFromState
    ? useCases.filter((useCase) => useCase.tags?.some((tag) => tag === tagFromState))
    : useCases

  const [selectedTags, setSelectedTags] = useState(new Set(tagFromState ? [tagFromState] : []))

  const [filteredUseCases, setFilteredUseCases] = useState(initialUseCases)
  const [fade, setFade] = useState(true)
  const [numberOfUseCases, setNumberOfUseCases] = useState(initialUseCases.length)

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
      setNumberOfUseCases(useCases.length)
      setTimeout(() => {
        setFilteredUseCases(useCases)
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
    const filteredUseCases =
      newSelectedTags.size === 0
        ? useCases
        : useCases.filter((useCase) => useCase.tags?.some((tag) => newSelectedTags.has(tag)))

    setNumberOfUseCases(filteredUseCases.length)
    setTimeout(() => {
      setFilteredUseCases(filteredUseCases)
    }, timeout)
  }

  return (
    <Container size={'large'} className={styles.gridContainer}>
      <h1 className={styles.title}>Use Cases</h1>
      <div className={styles.useCasesRoot}>
        <section>
          <div className={styles.filterSection}>
            <span className={styles.showingUseCases}>
              Showing {pluralize(numberOfUseCases, 'use case')}
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
              items={filteredUseCases.map((useCase) => {
                return <UseCase key={useCase.path} {...useCase} />
              })}
              perRow={3}
              className={classNames(styles.useCasesGrid, { [styles.fadeOut]: !fade, [styles.fadeIn]: fade })}
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
