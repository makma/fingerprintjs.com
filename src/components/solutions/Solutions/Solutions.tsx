import React from 'react'
import Solution, { SolutionProps } from '../Solution/Solution'
import classNames from 'classnames'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper'
import Grid from '../../Grid/Grid'

import styles from './Solutions.module.scss'

export interface SolutionsProps {
  solutions: Array<SolutionProps>
  title?: string
}
export default function Solutions({ solutions, title }: SolutionsProps) {
  return (
    <>
      <div className={styles.row}>
        <h2 className={styles.title}>{title}</h2>
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
            {solutions.map((solution, index) => {
              return (
                <SwiperSlide key={solution.path} className={`swiper-slide ${index === 0 ? styles.firstItem : ''}`}>
                  <Solution className={styles.solution} {...solution} />
                </SwiperSlide>
              )
            })}
          </div>
          <div className={classNames('swiper-pagination', styles.bullets)} />
        </Swiper>
      </div>
      <Grid
        items={solutions.map((solution) => {
          return <Solution key={solution.path} {...solution} />
        })}
        perRow={4}
        className={styles.desktopOnly}
      />
    </>
  )
}
