import React from 'react'
import IntegrationCard, { IntegrationCardProps } from '../IntegrationCard/IntegrationCard'

import styles from './IntegrationCards.module.scss'

export interface IntegrationCardsProps {
  cards: IntegrationCardProps[]
}
export default function IntegrationCards({ cards }: IntegrationCardsProps) {
  return (
    <div className={styles.integrationCards}>
      {cards.map((props) => (
        <IntegrationCard {...props} key={props.title} />
      ))}
    </div>
  )
}
