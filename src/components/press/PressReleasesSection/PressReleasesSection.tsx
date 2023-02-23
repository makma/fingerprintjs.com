import React, { useState } from 'react'

import Section from '../../common/Section'
import Container from '../../common/Container'
import { ReactComponent as ArrowSVG } from './ArrowSVG.svg'
import { paginate } from '../../../helpers/common'
import classNames from 'classnames'
import styles from './PressReleasesSection.module.scss'
import { Pagination } from '../../Pagination/Pagination'
import { motion, AnimatePresence } from 'framer-motion'

export interface PressReleasesSectionProps {
  pressReleasesCards: CardProps[]
  newsCards: CardProps[]
}
export default function PressReleasesSection({ pressReleasesCards, newsCards }: PressReleasesSectionProps) {
  const maxPressCards = 6
  const maxNewsCards = 4
  const pressReleasesPages = paginate(pressReleasesCards, maxPressCards)
  const NewsPages = paginate(newsCards, maxNewsCards)

  const [pressPage, setPressPage] = useState(1)
  const [newsPage, setNewsPage] = useState(1)

  // Calculate min height according to the number of cards of the first page (to avoid height changes in pagination (desktop only))
  const maxPress = Math.round(pressReleasesPages[0].length / 2) * 240
  const maxNews = NewsPages[0].length * 160
  const minHeight = Math.max(maxPress, maxNews)

  const style = {
    ...((NewsPages.length > 1 || pressReleasesPages.length > 1) &&
      ({ '--minHeight': `${minHeight}px` } as React.CSSProperties)),
  }
  return (
    <Section className={styles.root}>
      <Container className={styles.heroContainer} size='large'>
        <div className={styles.titleBox}>
          <h1 className={styles.title}>Press and Brand Resources</h1>
        </div>
      </Container>
      <div className={styles.backgroundLayer} />
      <Container style={style} className={styles.pressContainer} size='large'>
        <h2 className={styles.pressTitle}>Press Releases</h2>
        <AnimatePresence exitBeforeEnter>
          <motion.div className={styles.pressCards} key={pressPage}>
            {pressReleasesPages[pressPage - 1].map((card, i) => (
              <Card {...card} key={`${card.title}-${pressPage}-${i}`} box />
            ))}
          </motion.div>
        </AnimatePresence>
        {pressReleasesPages.length > 1 && (
          <div className={styles.pressCardsPagination}>
            <Pagination currentPage={pressPage} numberOfPages={pressReleasesPages.length} onPageChange={setPressPage} />
          </div>
        )}
        <h2 className={styles.newsTitle}>In the News</h2>
        <AnimatePresence exitBeforeEnter>
          <motion.div className={styles.newsCards} key={newsPage}>
            {NewsPages[newsPage - 1].map((card, i) => (
              <Card {...card} key={`${card.title}-${newsPage}-${i}`} />
            ))}
          </motion.div>
        </AnimatePresence>
        {NewsPages.length > 1 && (
          <div className={styles.newsCardsPagination}>
            <Pagination
              currentPage={newsPage}
              numberOfPages={NewsPages.length}
              onPageChange={setNewsPage}
              backgroundDotColorMobile='#e8e8e8'
            />
          </div>
        )}
      </Container>
    </Section>
  )
}

export interface CardProps {
  title: string
  website: string
  url: string
  key: string
  box?: boolean
}
function Card({ title, website, url, key, box }: CardProps) {
  return (
    <motion.div
      key={key}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={classNames(styles.card, { [styles.box]: box })}
    >
      <hgroup>
        <h6 className={styles.cardTitle}>{title}</h6>
        <p className={styles.company}>{website}</p>
      </hgroup>
      <a target='_blank' rel='noreferrer' className={styles.link} href={url}>
        <span>Read Article</span>
        <ArrowSVG className={styles.arrow} />
      </a>
    </motion.div>
  )
}
