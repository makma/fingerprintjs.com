import React, { useState } from 'react'
import Post, { PostProps } from '../Post/Post'
import classNames from 'classnames'
import TagList from '../TagList/TagList'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper'
import { kebabToTitle } from '../../helpers/case'

import styles from './PostGrid.module.scss'

export interface PostGridProps {
  variant?: 'posts' | 'solutions'
  posts: Array<PostProps>
  name?: string
  link?: React.ReactNode
  tags?: string[]
  perRow?: 'four' | 'three'
  nameIsCentered?: boolean
  limitPostLines?: boolean
  useSwiper?: boolean
}
export default function PostGrid({
  variant = 'posts',
  posts,
  name,
  nameIsCentered,
  link,
  tags,
  perRow = 'four',
  limitPostLines,
  useSwiper = false,
}: PostGridProps) {
  const [selectedTags, setSelectedTags] = useState(new Set())
  const [selectedSolutions, setSelectedSolutions] = useState(posts)
  const [fade, setFade] = useState(true)

  const handleSelectedTags = (tag?: string) => {
    setFade(false)

    setTimeout(() => {
      if (!tag) {
        setSelectedTags(new Set())
        setSelectedSolutions(posts)
        setFade(true)
        return
      }

      const newSelectedTags = new Set(selectedTags)

      if (selectedTags.has(tag)) {
        newSelectedTags.delete(tag)
      } else {
        newSelectedTags.add(tag)
      }

      setSelectedTags(newSelectedTags)

      const filteredSolutions = posts.filter((solution) => solution.tags?.some((tag) => newSelectedTags.has(tag)))
      newSelectedTags.size === 0 ? setSelectedSolutions(posts) : setSelectedSolutions(filteredSolutions)
      setFade(true)
    }, 500)
  }

  switch (variant) {
    case 'posts':
      return useSwiper ? (
        <>
          <div className={classNames(styles.row, { [styles.alignNameCenter]: nameIsCentered })}>
            <h2 className={styles.name}>{name}</h2>
          </div>
          <div className={classNames(styles.swiperSection, styles.mobileOnly)}>
            <Swiper
              modules={[Pagination]}
              breakpoints={{
                320: {
                  slidesPerView: 1.3,
                  spaceBetween: 16,
                  pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                  },
                },
                768: {
                  slidesPerView: 3.5,
                  spaceBetween: 28,
                  pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                  },
                },
              }}
            >
              <div className='swiper-wrapper'>
                {posts.map((post, index) => {
                  return (
                    <SwiperSlide key={post.path} className={`swiper-slide ${index === 0 ? styles.firstItem : ''}`}>
                      <Post className={styles.post} perRow={perRow} limitTextLines={limitPostLines} {...post} />
                    </SwiperSlide>
                  )
                })}
              </div>
              <div className={classNames('swiper-pagination', styles.bullets)} />
            </Swiper>
          </div>
          <div className={classNames(styles.grid, styles.desktopOnly)}>
            {posts.map((post) => {
              return <Post perRow={perRow} key={post.path} limitTextLines={limitPostLines} {...post} />
            })}
          </div>
        </>
      ) : (
        <div className={styles.root}>
          {tags && (
            <div className={styles.tags}>
              <h2>Tags</h2>
              <TagList tags={tags} direction='vertical' format='title' />
            </div>
          )}

          <div className={styles.posts}>
            {name && (
              <div className={classNames(styles.row, { [styles.alignNameCenter]: nameIsCentered })}>
                <h2 className={styles.name}>{name}</h2>
                {link}
              </div>
            )}
            <div className={classNames(styles.grid, { [styles.threePerRow]: perRow === 'three' })}>
              {posts.map((post) => {
                return <Post perRow={perRow} key={post.path} limitTextLines={limitPostLines} {...post} />
              })}
            </div>
          </div>
        </div>
      )
    case 'solutions': {
      return (
        <div className={styles.solutionsRoot}>
          <section className={styles.posts}>
            <div className={styles.filterSection}>
              <span className={styles.showingSolutions}>
                Showing {selectedSolutions.length} solutions
                {selectedTags.size > 0 && ` matching ${selectedTags.size} filter`}
              </span>
              <span
                className={classNames(styles.filter, { [styles.hideFilter]: selectedTags.size === 0 })}
                onClick={() => handleSelectedTags()}
              >
                Clear all filters
              </span>
            </div>
            <div className={classNames(styles.solutionsGrid, { [styles.fadeOut]: !fade }, { [styles.fadeIn]: fade })}>
              {selectedSolutions.map((solution) => {
                return <Post key={solution.path} limitTextLines={limitPostLines} {...solution} type='solution' />
              })}
            </div>
          </section>
          {tags && (
            <section className={styles.tags}>
              <ul className={styles.tagSection}>
                {tags?.map((tag) => (
                  <li key={tag} className={styles.item} onClick={() => handleSelectedTags(tag)}>
                    <span className={classNames(styles.tag, { [styles.selectedTag]: selectedTags.has(tag) })}>
                      {kebabToTitle(tag)}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )
    }
  }
}
