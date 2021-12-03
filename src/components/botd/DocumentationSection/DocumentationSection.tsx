import React from 'react'
import Container from '../../common/Container'
import Button from '../../common/Button'
import { URL } from '../../../constants/content'

import styles from './DocumentationSection.module.scss'

export default function HeroSection() {
  return (
    <Container className={styles.container}>
      <div className={styles.descriptionSection}>
        <h1 className={styles.title}>Developer-friendly bot detection</h1>
        <Button href={URL.signupUrl} variant='primary' size='big' className={styles.button}>
          Read documentation
        </Button>
      </div>
      <div className={styles.botDSection}>
        <Card icon={futureProofedSvg} title='Future-proofed'>
          Hosted and maintained by our team - ensure identification accuracy without in-house expertise.
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
    <div className={styles.benefit}>
      <div className={styles.iconContainer}>
        <Icon className={styles.icon} />
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{children}</p>
      </div>
    </div>
  )
}
