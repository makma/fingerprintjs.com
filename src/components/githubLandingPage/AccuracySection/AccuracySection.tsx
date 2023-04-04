import React, { useState, useRef } from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'
import { useGithubFpjs } from '../../../context/GithubContext'
import { kFormatter, formatNumberWithCommas } from '../../../helpers/format'
import { ReactComponent as LineSVG } from './LineSVG.svg'
import { ReactComponent as GitHubSVG } from './GitHubSVG.svg'
import classNames from 'classnames'
import { URL } from '../../../constants/content'

import styles from './AccuracySection.module.scss'
import { AnimatePresence, motion } from 'framer-motion'
import { useInView } from 'framer-motion'

enum xOptions {
  X1 = '0',
  X2 = '1',
  X3 = '2',
  X4 = '3',
}

enum tabOptions {
  Accuracy,
  Stability,
}
export default function AccuracySection() {
  const ref = useRef(null)
  const isInView = useInView(ref)

  const { githubData } = useGithubFpjs()

  const chartWidth = 860
  const chartHeight = 414
  const xPoints = 4
  const maxY = 100000
  const offset = 25
  const yPointsPro = [99500, 99003, 98507, 98015]
  const xScale = ['30 days', '60 days', '90 days', '120 days']
  const yScale = ['100k', '75k', '50k', '25k', '0']

  const [HoverIndex, setHoverIndex] = useState(xOptions.X1)
  const [currentTab, setCurrentTab] = useState(tabOptions.Accuracy)

  const chartPointsPro = [
    {
      y: (yPointsPro[0] / maxY) * chartHeight,
      x: (chartWidth / (xPoints - 1)) * 0 + offset,
      yLine: (yPointsPro[0] / maxY) * chartHeight,
      xLine: 0,
    },
    {
      y: (yPointsPro[1] / maxY) * chartHeight,
      x: (chartWidth / (xPoints - 1)) * 1,
      yLine: (yPointsPro[0] / maxY) * chartHeight - 2,
      xLine: (chartWidth / (xPoints - 1)) * 1,
    },
    {
      y: (yPointsPro[2] / maxY) * chartHeight,
      x: (chartWidth / (xPoints - 1)) * 2,
      yLine: (yPointsPro[0] / maxY) * chartHeight - 4,
      xLine: (chartWidth / (xPoints - 1)) * 2,
    },
    {
      y: (yPointsPro[3] / maxY) * chartHeight,
      x: (chartWidth / (xPoints - 1)) * 3 - offset,
      yLine: (yPointsPro[0] / maxY) * chartHeight - 6,
      xLine: (chartWidth / (xPoints - 1)) * 3,
    },
  ]
  const xSidesPro = [
    chartPointsPro[1].xLine - chartPointsPro[0].xLine,
    chartPointsPro[2].xLine - chartPointsPro[1].xLine,
    chartPointsPro[3].xLine - chartPointsPro[2].xLine,
  ]
  const ySidesPro = [
    chartPointsPro[0].y - chartPointsPro[1].y,
    chartPointsPro[1].y - chartPointsPro[2].y,
    chartPointsPro[2].y - chartPointsPro[3].y,
  ]
  const HypoPro = [
    Math.round(Math.hypot(xSidesPro[0], ySidesPro[0])),
    Math.round(Math.hypot(xSidesPro[1], ySidesPro[1])),
    Math.round(Math.hypot(xSidesPro[2], ySidesPro[2])),
  ]
  const AnglePro = [
    Math.round(Math.asin(ySidesPro[0] / HypoPro[0]) * (180 / Math.PI)),
    Math.round(Math.asin(ySidesPro[1] / HypoPro[1]) * (180 / Math.PI)),
    Math.round(Math.asin(ySidesPro[2] / HypoPro[2]) * (180 / Math.PI)),
  ]
  const yPointsOss = [60000, 36000, 21600, 12960]

  const chartPointsOss = [
    {
      y: (yPointsOss[0] / maxY) * chartHeight,
      x: (chartWidth / (xPoints - 1)) * 0 + offset,
      yLine: (yPointsOss[0] / maxY) * chartHeight - 10,
      xLine: 0,
    },
    {
      y: (yPointsOss[1] / maxY) * chartHeight,
      x: (chartWidth / (xPoints - 1)) * 1,
      yLine: (yPointsOss[1] / maxY) * chartHeight,
      xLine: (chartWidth / (xPoints - 1)) * 1,
    },
    {
      y: (yPointsOss[2] / maxY) * chartHeight,
      x: (chartWidth / (xPoints - 1)) * 2,
      yLine: (yPointsOss[2] / maxY) * chartHeight,
      xLine: (chartWidth / (xPoints - 1)) * 2,
    },
    {
      y: (yPointsOss[3] / maxY) * chartHeight,
      x: (chartWidth / (xPoints - 1)) * 3 - offset,
      yLine: (yPointsOss[3] / maxY) * chartHeight + 2,
      xLine: (chartWidth / (xPoints - 1)) * 3,
    },
  ]
  const xSidesOss = [
    chartPointsOss[1].xLine - chartPointsOss[0].xLine,
    chartPointsOss[2].xLine - chartPointsOss[1].xLine,
    chartPointsOss[3].xLine - chartPointsOss[2].xLine,
  ]
  const ySidesOss = [
    chartPointsOss[0].y - chartPointsOss[1].y,
    chartPointsOss[1].y - chartPointsOss[2].y,
    chartPointsOss[2].y - chartPointsOss[3].y,
  ]
  const HypoOss = [
    Math.round(Math.hypot(xSidesOss[0], ySidesOss[0])),
    Math.round(Math.hypot(xSidesOss[1], ySidesOss[1])),
    Math.round(Math.hypot(xSidesOss[2], ySidesOss[2])),
  ]

  const AngleOss = [
    Math.round(Math.asin(ySidesOss[0] / HypoOss[0]) * (180 / Math.PI)),
    Math.round(Math.asin(ySidesOss[1] / HypoOss[1]) * (180 / Math.PI)),
    Math.round(Math.asin(ySidesOss[2] / HypoOss[2]) * (180 / Math.PI)),
  ]
  return (
    <Section className={styles.root}>
      <Container size='large' className={styles.container}>
        <a
          target='_blank'
          rel='noreferrer'
          href={URL.githubRepoUrl}
          className={classNames(styles.starsBox, {
            [styles.hoverMobile]: isInView,
          })}
        >
          <span className={styles.logo}>
            <GitHubSVG />
            {githubData ? `${kFormatter(githubData.stargazers_count, true)}+` : '..k+'}
          </span>
          <span className={styles.stars}>Github Stars</span>
        </a>
        <h2 className={styles.title}>The world’s most accurate visitor identifier</h2>
        <div className={styles.cardsSection}>
          <div
            className={classNames(styles.card, {
              [styles.selectedCard]: currentTab === tabOptions.Accuracy,
            })}
            onClick={() => setCurrentTab(tabOptions.Accuracy)}
          >
            <span className={styles.cardLabel}>
              <span className={styles.cardLabelText}>Accuracy</span>
            </span>
            <h4 className={styles.cardTitle}>99.5% Accuracy</h4>
            <p className={styles.cardDescription} ref={ref}>
              Highest identification accuracy using fingerprinting, fuzzy matching and server-side techniques.
            </p>
          </div>
          <div
            className={classNames(styles.card, {
              [styles.selectedCard]: currentTab === tabOptions.Stability,
            })}
            onClick={() => setCurrentTab(tabOptions.Stability)}
          >
            <span className={styles.cardLabel}>
              <span className={styles.cardLabelText}>Stability</span>
            </span>
            <h4 className={styles.cardTitle}>Permanent Identifier</h4>
            <p className={styles.cardDescription}>
              Pro&apos;s visitor identifier can remain the same for years, even as browsers are upgraded.
            </p>
          </div>
        </div>
        <div className={styles.chartTitle}>
          <span>Correctly Identified Devices</span>
          <div className={styles.chartLinesTitle}>
            <div className={styles.lineTitle}>
              <LineSVG className={styles.ossLine} />
              <span>Open Source</span>
            </div>
            <div className={styles.lineTitle}>
              <LineSVG className={styles.proLine} />
              <span>Fingerprint Pro</span>
            </div>
          </div>
        </div>
        <AnimatePresence initial={false} mode='wait'>
          <figure className={styles.chart}>
            <ul className={styles.chartY}>
              {yScale.map((point) => (
                <li key={point}>
                  {point}
                  {currentTab === tabOptions.Stability && (
                    <motion.div
                      key={currentTab}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={styles.xLine}
                    />
                  )}
                </li>
              ))}
            </ul>
            <ul className={styles.chartLine} style={{ height: `${chartHeight}px`, width: `${chartWidth}px` }}>
              {chartPointsPro.map(({ y, x, yLine, xLine }, index) => {
                const hoverElement = parseInt(HoverIndex) === index && currentTab === tabOptions.Accuracy
                return (
                  <li
                    suppressHydrationWarning
                    key={`pro-${Math.round(x)}`}
                    style={
                      {
                        '--y': `${Math.round(y)}px`,
                        '--x': `${Math.round(x)}px`,
                        '--yLine': `${Math.round(yLine)}px`,
                        '--xLine': `${Math.round(xLine)}px`,
                      } as React.CSSProperties
                    }
                  >
                    <div
                      suppressHydrationWarning
                      className={styles.lineSegmentPro}
                      style={
                        {
                          '--hypotenuse': HypoPro[index],
                          '--angle': AnglePro[index],
                        } as React.CSSProperties
                      }
                    />
                    <span
                      className={classNames(styles.labelPro, {
                        [styles.labelProHover]: hoverElement,
                        [styles.labelProStability]: currentTab === tabOptions.Stability,
                      })}
                    >
                      {formatNumberWithCommas(yPointsPro[index])}
                    </span>
                    <div
                      className={classNames(styles.dataPointPro, {
                        [styles.dataPointProHover]: hoverElement,
                      })}
                      data-value={`${yPointsPro[index]}`}
                    />
                    <span className={classNames(styles.xPoint, { [styles.xPointHover]: hoverElement })}>
                      {xScale[index]}
                    </span>
                    {currentTab === tabOptions.Accuracy && (
                      <motion.div
                        key={currentTab}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={classNames(styles.yLine, { [styles.yLineHover]: hoverElement })}
                      />
                    )}
                    <div
                      className={styles.yLineArea}
                      onMouseOver={(e) => {
                        e.preventDefault()
                        setHoverIndex(Object.values(xOptions)[index])
                      }}
                    />
                  </li>
                )
              })}
              {chartPointsOss.map(({ y, x, yLine, xLine }, index) => {
                const hoverElement = parseInt(HoverIndex) === index && currentTab === tabOptions.Accuracy

                return (
                  <li
                    key={`oss-${x}`}
                    style={
                      {
                        '--y': `${Math.round(y)}px`,
                        '--x': `${Math.round(x)}px`,
                        '--yLine': `${Math.round(yLine)}px`,
                        '--xLine': `${Math.round(xLine)}px`,
                      } as React.CSSProperties
                    }
                  >
                    <div
                      className={styles.lineSegmentOss}
                      style={
                        {
                          '--hypotenuse': HypoOss[index],
                          '--angle': AngleOss[index],
                        } as React.CSSProperties
                      }
                    />
                    <div
                      className={classNames(styles.dataPointOss, {
                        [styles.dataPointOssHover]: hoverElement,
                      })}
                      data-value={`${yPointsOss[index]}`}
                    />
                    <span
                      suppressHydrationWarning
                      className={classNames(styles.labelOss, {
                        [styles.labelOssHover]: hoverElement,
                        [styles.labelOssStability]: currentTab === tabOptions.Stability,
                      })}
                    >
                      {formatNumberWithCommas(yPointsOss[index])}
                    </span>
                  </li>
                )
              })}
            </ul>
          </figure>
        </AnimatePresence>
      </Container>
    </Section>
  )
}
