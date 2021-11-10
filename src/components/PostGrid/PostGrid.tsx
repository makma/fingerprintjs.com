import React from 'react'
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
          <div className={styles.posts}>
            <div className={classNames(styles.solutionsGrid)}>
              {posts.map((post) => {
                return <Post key={post.path} limitTextLines={limitPostLines} {...post} type='solution' />
              })}
            </div>
          </div>
          {tags && (
            <div className={styles.tags}>
              <ul className={styles.tagSection}>
                {tags?.map((tag) => (
                  <li key={tag} className={styles.item}>
                    <span className={styles.tag}>{kebabToTitle(tag)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )
    }
  }
}
