import React, { useState } from 'react'
import Button from '../common/Button'
import { useUtmParams } from '../../hooks/useUtmParams'
import { isBrowser } from '../../helpers/detector'

import styles from './ContactSalesForm.module.scss'

export default function ContactSalesForm() {
  const [website, setWebsite] = useState('')
  const leadSource = 'Contact Us Form'
  const utmInfo = useUtmParams()
  const referrer = isBrowser() ? document.referrer : null

  return (
    <form
      className={styles.contactSalesForm}
      action='https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8'
      method='POST'
    >
      <input type='hidden' name='oid' value='00D4x000006rShv' />
      <input type='hidden' name='retURL' value='https://fingerprintjs.com/contact-sales/confirm' />
      <input type='hidden' id='lead_source' name='lead_source' value={leadSource} />

      {utmInfo.utm_campaign && (
        <input type='hidden' id='utm_campaign__c' name='utm_campaign__c' value={utmInfo.utm_campaign} />
      )}

      {utmInfo.utm_content && (
        <input type='hidden' id='utm_content__c' name='utm_content__c' value={utmInfo.utm_content} />
      )}

      {utmInfo.utm_medium && <input type='hidden' id='utm_medium__c' name='utm_medium__c' value={utmInfo.utm_medium} />}

      {utmInfo.utm_source && <input type='hidden' id='utm_source__c' name='utm_source__c' value={utmInfo.utm_source} />}

      {utmInfo.utm_term && <input type='hidden' id='utm_term__c' name='utm_term__c' value={utmInfo.utm_term} />}

      {referrer && <input type='hidden' id='referral_url__c' name='referral_url__c' value={referrer} />}

      <div className={styles.form}>
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
        <input id='last_name' name='last_name' type='hidden' value='Unknown' />
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
        <input id='company' name='company' type='hidden' value={website} />
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
