import React from 'react'
import Post, { PostProps } from '../Post/Post'
import classNames from 'classnames'
import TagList from '../TagList/TagList'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper'
import Grid from '../Grid/Grid'

import styles from './Posts.module.scss'

export interface PostsProps {
  posts: Array<PostProps>
  name?: string
  link?: React.ReactNode
  tags?: string[]
  perRow?: 3 | 4
  nameIsCentered?: boolean
  limitPostLines?: boolean
  useSwiper?: boolean
  activeTag?: string
  tagLink?: string
}
export default function Posts({
  posts,
  name,
  nameIsCentered,
  link,
  tags,
  perRow = 4,
  limitPostLines,
  useSwiper = false,
  activeTag,
  tagLink,
}: PostsProps) {
  return useSwiper ? (
    <SwiperPosts
      posts={posts}
      name={name}
      nameIsCentered={nameIsCentered}
      perRow={perRow}
      limitPostLines={limitPostLines}
    />
  ) : (
    <PostGrid
      posts={posts}
      name={name}
      nameIsCentered={nameIsCentered}
      link={link}
      perRow={perRow}
      tags={tags}
      limitPostLines={limitPostLines}
      activeTag={activeTag}
      tagLink={tagLink}
    />
  )
}

interface SwiperPostsProps {
  posts: Array<PostProps>
  name?: string
  perRow?: 3 | 4
  nameIsCentered?: boolean
  limitPostLines?: boolean
}
function SwiperPosts({ name, nameIsCentered, perRow, limitPostLines, posts }: SwiperPostsProps) {
  return (
    <>
      <div className={classNames(styles.row, { [styles.alignNameCenter]: nameIsCentered })}>
        <h2 className={styles.name}>{name}</h2>
      </div>
      <div className={classNames(styles.swiperSection, styles.mobileOnly)}>
        <Swiper
          modules={[Pagination]}
          slidesPerView='auto'
          breakpoints={{
            100: {
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
                <SwiperSlide
                  key={`${post.path}-${index}`}
                  className={`swiper-slide ${index === 0 ? styles.firstItem : ''}`}
                >
                  <Post className={styles.post} perRow={perRow} limitTextLines={limitPostLines} {...post} />
                </SwiperSlide>
              )
            })}
          </div>
          <div className={classNames('swiper-pagination', styles.bullets)} />
        </Swiper>
      </div>
      <Grid
        items={posts.map((post) => {
          return <Post perRow={perRow} key={post.path} limitTextLines={limitPostLines} {...post} />
        })}
        perRow={perRow}
        className={styles.desktopOnly}
      />
    </>
  )
}

interface PostGridProps extends SwiperPostsProps {
  link?: React.ReactNode
  tags?: string[]
  activeTag?: string
  tagLink?: string
}
function PostGrid({
  posts,
  name,
  link,
  tags,
  perRow,
  nameIsCentered,
  limitPostLines,
  activeTag,
  tagLink,
}: PostGridProps) {
  return (
    <div className={styles.postGrid}>
      <div className={styles.posts}>
        {name && (
          <div className={classNames(styles.row, { [styles.alignNameCenter]: nameIsCentered })}>
            <h2 className={classNames(styles.name, { [styles.nameThreePerRow]: perRow === 3 })}>{name}</h2>
            {link}
          </div>
        )}
        <Grid
          items={posts.map((post) => {
            return (
              <Post perRow={perRow} key={post.path} limitTextLines={limitPostLines} activeTag={activeTag} {...post} />
            )
          })}
          perRow={perRow}
        />
      </div>
      {tags && (
        <aside className={styles.tags}>
          <div className={styles.sticky}>
            <span className={styles.tagTitle}>Tags</span>
            <TagList
              tagLink={tagLink ?? '/blog/tag/'}
              tags={tags}
              direction='vertical'
              format='title'
              activeTag={activeTag}
            />
          </div>
        </aside>
      )}
    </div>
  )
}
