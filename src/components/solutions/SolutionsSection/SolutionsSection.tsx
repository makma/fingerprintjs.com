import React, { useState } from 'react'
import Post, { PostProps } from '../../Post/Post'
import Container from '../../common/Container'
import classNames from 'classnames'
import { kebabToTitle } from '../../../helpers/case'

import styles from './SolutionsSection.module.scss'

export interface SolutionsSectionProps {
  posts: Array<PostProps>
  tags?: string[]
}
export default function SolutionsSection({ posts, tags }: SolutionsSectionProps) {
  const [selectedTags, setSelectedTags] = useState(new Set())
  const [filteredSolutions, setFilteredSolutions] = useState(posts)
  const [fade, setFade] = useState(true)
  const [numberOfSolutions, setNumberOfSolutions] = useState(posts.length)

  const handleSelectedTags = (tag?: string) => {
    const timeout = 400
    setFade(false)

    if (!tag) {
      setSelectedTags(new Set())
      setNumberOfSolutions(posts.length)
      setTimeout(() => {
        setFilteredSolutions(posts)
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
        ? posts
        : posts.filter((solution) => solution.tags?.some((tag) => newSelectedTags.has(tag)))

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
              Showing {numberOfSolutions} solutions
              {selectedTags.size > 0 && ` matching ${selectedTags.size} filter`}
            </span>
            <span
              className={classNames(styles.filter, { [styles.hideFilter]: selectedTags.size === 0 })}
              onClick={() => handleSelectedTags()}
            >
              Clear all filters
            </span>
          </div>
          <div
            className={classNames(styles.solutionsGrid, { [styles.fadeOut]: !fade }, { [styles.fadeIn]: fade })}
            onTransitionEnd={() => setFade(true)}
          >
            {filteredSolutions.map((solution) => {
              return <Post key={solution.path} {...solution} showPublishDate={false} />
            })}
          </div>
        </section>
        {tags && (
          <section className={styles.tags}>
            <ul className={styles.tagSection}>
              {tags?.map((tag) => (
                <li key={tag} className={styles.item} onClick={() => handleSelectedTags(tag)}>
                  <button className={classNames(styles.tag, { [styles.selectedTag]: selectedTags.has(tag) })}>
                    {kebabToTitle(tag)}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </Container>
  )
}
