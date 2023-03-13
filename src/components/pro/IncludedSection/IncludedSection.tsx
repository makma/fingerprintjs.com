import React from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'

import styles from './IncludedSection.module.scss'

import { ReactComponent as IdentificationSVG } from './IdentificationSVG.svg'
import { ReactComponent as LocationSVG } from './LocationSVG.svg'
import { ReactComponent as IncognitoSVG } from './IncognitoSVG.svg'

import { Swiper, SwiperSlide } from 'swiper/react'

export default function IncludedSection() {
  const cards = [
    <Card
      icon={<IdentificationSVG />}
      title='Anonymous User Identification'
      description='Every visitor to your website is assigned a permanent visitorID that can ve used to identify visitors trying to change their identity via proxies or other techniques.'
      key='identification'
    />,
    <Card
      icon={<LocationSVG />}
      title='Geolocation'
      description='Every identification API request will provide the geolocation of the current visitor, including geoposition, city, country, timezone and ISP information.'
      key='location'
    />,
    <Card
      icon={<IncognitoSVG />}
      title='Incognito Mode Detection'
      description='Fingerprint Pro tracks whether visitors are using incognito mode, and accurately identify users across incognito browsing sessions.'
      key='incognito'
    />,
  ]
  return (
    <Section className={styles.root}>
      <Container size='large' className={styles.container}>
        <h2 className={styles.title}>What&apos;s included in a Fingerprint Pro Response?</h2>
        <div className={styles.cards}>{cards.map((card) => card)}</div>
      </Container>
      <Swiper
        spaceBetween={8}
        slidesPerView={1.1}
        slidesOffsetBefore={20}
        slidesOffsetAfter={20}
        className={styles.mobileContainer}
      >
        {cards.map((card, index) => (
          <SwiperSlide className={styles.slide} key={`life-slide-${index}`}>
            {card}
          </SwiperSlide>
        ))}
      </Swiper>
    </Section>
  )
}
interface CardProps {
  icon: React.ReactNode
  title: string
  description: string
}
function Card({ icon, title, description }: CardProps) {
  return (
    <div className={styles.card}>
      <span className={styles.cardIcon}>{icon}</span>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{description}</p>
    </div>
  )
}
