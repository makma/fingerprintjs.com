import React, { useState } from 'react'
import Button from '../common/Button'

import styles from './ContactSalesForm.module.scss'

export default function ContactSalesForm() {
  const [website, setWebsite] = useState('')
  const leadSource = 'Contact Us Form'
  return (
    <form
      className={styles.contactSalesForm}
      action='https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8'
      method='POST'
    >
      <div className={styles.form}>
        <input hidden={true} name='oid' value='00D4x000006rShv' />
        <input hidden={true} name='retURL' value='https://fingerprintjs.com/contact-sales/confirm' />
        <input hidden={true} id='lead_source' name='lead_source' value={leadSource} />

        <label className={styles.label} htmlFor='first_name'>
          Your name
        </label>
        <input
          className={styles.input}
          id='first_name'
          maxLength={40}
          name='first_name'
          size={20}
          type='text'
          placeholder='John'
          required
        />
        <input id='last_name' maxLength={80} name='last_name' size={20} type='text' hidden={true} value='Unknown' />
        <label className={styles.label} htmlFor='email'>
          Work email
        </label>
        <input
          className={styles.input}
          id='email'
          maxLength={80}
          name='email'
          size={20}
          type='email'
          placeholder='john@gmail.com'
          required
        />
        <input id='company' maxLength={40} name='company' size={20} type='text' hidden={true} value={website} />
        <label className={styles.label} htmlFor='url'>
          Company Website
        </label>
        <input
          className={styles.input}
          id='url'
          maxLength={80}
          name='url'
          size={20}
          type='text'
          placeholder='google.com'
          value={website}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => setWebsite(e.target.value)}
          required
        />
        <label className={styles.label} htmlFor='description'>
          Tell us about your project
        </label>
        <textarea
          className={styles.textArea}
          name='description'
          rows={3}
          placeholder='Tell us about your project, needs, or any questions you may have'
        />
        <Button className={styles.button} type='submit' size='big'>
          Submit
        </Button>
      </div>
    </form>
  )
}
