import React, { useState } from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'

import { ReactComponent as LineSVG } from './LineSVG.svg'
import classNames from 'classnames'

import styles from './AccuracySection.module.scss'
import { AnimatePresence, motion } from 'framer-motion'

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
    Math.hypot(xSidesPro[0], ySidesPro[0]),
    Math.hypot(xSidesPro[1], ySidesPro[1]),
    Math.hypot(xSidesPro[2], ySidesPro[2]),
  ]
  const AnglePro = [ySidesPro[0] / HypoPro[0], ySidesPro[1] / HypoPro[1], ySidesPro[2] / HypoPro[2]]

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
    Math.hypot(xSidesOss[0], ySidesOss[0]),
    Math.hypot(xSidesOss[1], ySidesOss[1]),
    Math.hypot(xSidesOss[2], ySidesOss[2]),
  ]

  const AngleOss = [ySidesOss[0] / HypoOss[0], ySidesOss[1] / HypoOss[1], ySidesOss[2] / HypoOss[2]]

  return (
    <Section className={styles.root}>
      <Container size='large' className={styles.container}>
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
            <p className={styles.cardDescription}>
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
                    key={`pro-${x}`}
                    style={
                      {
                        '--y': `${y}px`,
                        '--x': `${x}px`,
                        '--yLine': `${yLine}px`,
                        '--xLine': `${xLine}px`,
                      } as React.CSSProperties
                    }
                  >
                    <div
                      className={styles.lineSegmentPro}
                      style={
                        {
                          '--hypotenuse': HypoPro[index],
                          '--angle': Math.asin(AnglePro[index]) * (180 / Math.PI),
                        } as React.CSSProperties
                      }
                    />
                    <span
                      className={classNames(styles.labelPro, {
                        [styles.labelProHover]: hoverElement,
                        [styles.labelProStability]: currentTab === tabOptions.Stability,
                      })}
                    >
                      {yPointsPro[index].toLocaleString()}
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
                        '--y': `${y}px`,
                        '--x': `${x}px`,
                        '--yLine': `${yLine}px`,
                        '--xLine': `${xLine}px`,
                      } as React.CSSProperties
                    }
                  >
                    <div
                      className={styles.lineSegmentOss}
                      style={
                        {
                          '--hypotenuse': HypoOss[index],
                          '--angle': Math.asin(AngleOss[index]) * (180 / Math.PI),
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
                      className={classNames(styles.labelOss, {
                        [styles.labelOssHover]: hoverElement,
                        [styles.labelOssStability]: currentTab === tabOptions.Stability,
                      })}
                    >
                      {yPointsOss[index].toLocaleString()}
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
