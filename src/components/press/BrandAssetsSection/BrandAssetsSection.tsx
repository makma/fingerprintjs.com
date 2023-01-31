import React from 'react'

import Section from '../../common/Section'
import Container from '../../common/Container'

import styles from './BrandAssetsSection.module.scss'

import { ReactComponent as FingerCardSVG } from './FingerCardSVG.svg'
import { ReactComponent as BrandGuidelinesSVG } from './BrandGuidelinesSVG.svg'
import { ReactComponent as ArrowSVG } from './ArrowSVG.svg'

export default function BrandAssetsSection() {
  return (
    <Section className={styles.root}>
      <Container className={styles.container} size='large'>
        <div className={styles.titleSection}>
          <h2 className={styles.title}>Brand Assets</h2>
        </div>
        <div className={styles.cardsSection}>
          <Card
            image={FingerCardSVG}
            title='Fingerprint Logo'
            description='Download contains EPS, SVG and JPG files for print and digital use.'
            hrefText='Download Logo Files'
            hrefLink='/assets/Fingerprint-WebPackage.zip'
          />
          <Card
            image={BrandGuidelinesSVG}
            title='Brand Guidelines'
            description='Documentation for our partners on how to use the Fingerprint logo, colors and typography.'
            hrefText='Download PDF'
            hrefLink='/pdf/assets/FP-BrandGuidelines.pdf'
          />
        </div>
      </Container>
    </Section>
  )
}

interface CardProps {
  image: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  title: string
  description: string
  hrefText: string
  hrefLink: string
}
function Card({ image: Image, title, description, hrefText, hrefLink }: CardProps) {
  return (
    <div className={styles.card}>
      <div>
        <Image className={styles.image} />
        <div className={styles.descriptionSection}>
          <h6 className={styles.title}>{title}</h6>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
      <a target='_blank' className={styles.link} href={hrefLink} rel='noreferrer'>
        {hrefText}
        <ArrowSVG className={styles.arrow} />
      </a>
    </div>
  )
}
