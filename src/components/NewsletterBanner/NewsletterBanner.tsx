import React from 'react'
import { ReactComponent as LetterSVG } from './LetterSVG.svg'
import { ReactComponent as LetterMobileSVG } from './LetterMobileSVG.svg'
import SubscribeNewsletterForm from '../SubscribeNewsletterForm/SubscribeNewsletterForm'
import { Forms } from '../../hooks/useForm'

import styles from './NewsletterBanner.module.scss'

export default function NewsletterBanner() {
  return (
    <section className={styles.container}>
      <div className={styles.banner}>
        <div className={styles.subscribeSection}>
          <h1 className={styles.title}>Subscribe to newsletter</h1>
          <p className={styles.description}>Get updates about company news and new features of Fingerprint Pro.</p>
          <SubscribeNewsletterForm origin={Forms.NewsletterBanner} />
        </div>
        <div className={styles.iconSection}>
          <LetterSVG className={styles.letterIcon} />
          <LetterMobileSVG className={styles.letterIconMobile} />
        </div>
      </div>
    </section>
  )
}
