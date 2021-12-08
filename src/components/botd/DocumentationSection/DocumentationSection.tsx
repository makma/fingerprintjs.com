import React from 'react'
import Container from '../../common/Container'
import Button from '../../common/Button'
import { DOC_URL } from '../../../constants/content'
import { ReactComponent as DocSvg } from './DocSVG.svg'
import { ReactComponent as LightweightSvg } from './LightweightSVG.svg'
import { ReactComponent as OpensourceSvg } from './OpensourceSVG.svg'

import styles from './DocumentationSection.module.scss'

export default function DocumentationSection() {
  return (
    <Container className={styles.container}>
      <div className={styles.buttonSection}>
        <h1 className={styles.title}>Developer-friendly bot detection</h1>
        <Button href={DOC_URL.botDUrl} variant='primary' size='big'>
          Read documentation
        </Button>
      </div>
      <div className={styles.cardsSection}>
        <Card icon={DocSvg} title='Extensive documentation'>
          Our docs are written for developers - easy to read, easier to implement.
        </Card>
        <Card icon={LightweightSvg} title='Lightweight agent'>
          Minimal page speed impact, keeping your website fast.
        </Card>
        <Card icon={OpensourceSvg} title='Open Source Powered'>
          Open source JavaScript agent and Cloud Integrations that are actively supported.
        </Card>
      </div>
    </Container>
  )
}

interface CardProps {
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  title: string
  children: string
}

function Card({ title, children, icon: Icon }: CardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.iconContainer}>
        <Icon className={styles.icon} />
      </div>
      <div className={styles.info}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDescription}>{children}</p>
      </div>
    </div>
  )
}
