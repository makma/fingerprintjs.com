import React from 'react'
import UseCase, { UseCaseProps } from '../UseCase/UseCase'
import classNames from 'classnames'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper'
import Grid from '../../Grid/Grid'

import styles from './UseCases.module.scss'

export interface UseCasesProps {
  useCases: Array<UseCaseProps>
  title?: string
}
export default function UseCases({ useCases, title }: UseCasesProps) {
  return (
    <>
      <div className={styles.row}>
        <h2 className={styles.title}>{title}</h2>
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
            {useCases.map((useCase, index) => {
              return (
                <SwiperSlide key={useCase.path} className={`swiper-slide ${index === 0 ? styles.firstItem : ''}`}>
                  <UseCase className={styles.useCase} {...useCase} />
                </SwiperSlide>
              )
            })}
          </div>
          <div className={classNames('swiper-pagination', styles.bullets)} />
        </Swiper>
      </div>
      <Grid
        items={useCases.map((useCase) => {
          return <UseCase key={useCase.path} {...useCase} />
        })}
        perRow={4}
        className={styles.desktopOnly}
      />
    </>
  )
}
