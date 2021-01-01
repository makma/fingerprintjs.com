import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination } from 'swiper'

import Section from '../common/Section'
import Container from '../common/Container'
import styles from './ClientsSection.module.scss'
import classNames from 'classnames'

SwiperCore.use([Pagination])

export default function ClientsSection() {
  const clients = ['ebay', 'target', 'us-bank', 'booking', 'ameritrade', 'dell', 'agoda']

  return (
    <Section className={styles.clients}>
      <Container>
        <Swiper
          className={styles.content}
          id='swiper-clients'
          spaceBetween={30}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 6 },
          }}
          pagination={{ clickable: true, el: '.swiper-pagination' }}
        >
          {clients.map((client) => {
            return (
              <SwiperSlide key={`slide_${client}`} className={styles.slide}>
                <img alt={`${client} logo`} className={styles.logo} src={`/img/company-logos/${client}.svg`} />
              </SwiperSlide>
            )
          })}
          <div className={classNames('swiper-pagination', styles.pagination)} />
        </Swiper>
      </Container>
    </Section>
  )
}
