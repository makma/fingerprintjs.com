import React, { useState } from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'
import Button from '../../common/Button'
import Modal from '../../common/Modal'
import ContactSalesForm from '../../ContactSalesForm'

import styles from './ContactSalesSection.module.scss'

export default function ContactSalesSection() {
  const [isContactSalesModalOpen, setIsContactSalesModalOpen] = useState(false)

  return (
    <>
      <Section className={styles.root}>
        <Container className={styles.titleContainer}>
          <h1 className={styles.title}>
            Learn how FingerprintJS Pro can help your business build a custom solution to prevent account sharing and
            unlock new revenue.
          </h1>
          <Button
            onClick={() => setIsContactSalesModalOpen(true)}
            variant='primary'
            size='big'
            className={styles.button}
          >
            Talk to sales
          </Button>
        </Container>
      </Section>
      <Modal title='Contact Sales' open={isContactSalesModalOpen} onClose={() => setIsContactSalesModalOpen(false)}>
        <ContactSalesForm />
      </Modal>
    </>
  )
}
