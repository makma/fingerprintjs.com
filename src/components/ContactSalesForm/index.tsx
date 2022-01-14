import React, { useState } from 'react'
import Button from '../common/Button'
import Section from '../../components/common/Section'
import classNames from 'classnames'

import { FormState } from '../../types/FormState'
import { trackLeadSubmit } from '../../helpers/gtm'
import { Forms, useForm } from '../../hooks/useForm'
import { createNewLead } from '../../helpers/api'
import { ReactComponent as ConfirmSVG } from './confirmSVG.svg'
import { ReactComponent as ErrorSVG } from './errorSVG.svg'
import { URL, MAILTO } from '../../constants/content'
import { useViewTracking } from '../../context/HistoryListener'

import styles from './ContactSalesForm.module.scss'

export default function ContactSalesForm() {
  const [formName, setFormName] = useState('')
  const [email, setEmail] = useState('')
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')

  const { formState, errorMessage, updateFormState, updateErrorMessage } = useForm(Forms.ContactSales)
  const { landingPage, previousPage, utmParams } = useViewTracking()

  async function handleSubmit(e) {
    e.preventDefault()

    updateFormState(FormState.Loading)

    function onError(error?) {
      updateFormState(FormState.Failed)

      if (error?.message) {
        if (error?.data[0]?.instancePath) {
          updateErrorMessage(`Validation error for ${error?.data[0]?.instancePath.substring(1)}`)
        } else {
          updateErrorMessage(error?.message)
        }
      }

      setTimeout(() => {
        updateFormState(FormState.Default)
      }, 50000)
      trackLeadSubmit(false)
    }

    try {
      const response = await createNewLead(formName, email, url, description, landingPage, previousPage, utmParams)
      const status = response.status

      if (status !== 200) {
        const { error } = await response.json()
        onError(error)
      } else {
        updateFormState(FormState.Success)
        trackLeadSubmit()
      }
    } catch (error) {
      onError()
    }
  }

  return (
    <Section
      className={classNames(
        { [styles.formSection]: formState === FormState.Default || formState === FormState.Loading },
        { [styles.stateSection]: formState === FormState.Failed || formState === FormState.Success }
      )}
    >
      {(formState === FormState.Default || formState === FormState.Loading) && (
        <>
          <h1 className={styles.header}>Talk to an Expert</h1>
          <h2 className={styles.subHeader}>Fill out the form below and we will reach out shortly.</h2>
          <form className={styles.contactSalesForm} onSubmit={handleSubmit}>
            <div className={styles.form}>
              <label className={styles.label} htmlFor='formName'>
                Your name
              </label>
              <input
                className={styles.input}
                id='formName'
                maxLength={40}
                name='formName'
                size={20}
                type='text'
                placeholder='John'
                onChange={(e) => setFormName(e.target.value)}
                disabled={formState === FormState.Loading}
                required
              />
              <label className={styles.label} htmlFor='email'>
                Work email
              </label>
              <input
                className={styles.input}
                id='email'
                maxLength={64}
                name='email'
                size={20}
                type='email'
                placeholder='john@gmail.com'
                onChange={(e) => setEmail(e.target.value)}
                disabled={formState === FormState.Loading}
                required
              />
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
                onChange={(e) => setUrl(e.target.value)}
                disabled={formState === FormState.Loading}
                required
              />
              <label className={styles.label} htmlFor='description'>
                Tell us about your project
              </label>
              <textarea
                className={styles.textArea}
                name='description'
                id='description'
                rows={3}
                placeholder='Tell us about your project, needs, or any questions you may have'
                onChange={(e) => setDescription(e.target.value)}
                disabled={formState === FormState.Loading}
              />
              <Button
                className={classNames(styles.button, { [styles.loadingButton]: formState === FormState.Loading })}
                type='submit'
                size='big'
                disabled={formState === FormState.Loading}
              >
                Submit
              </Button>
            </div>
          </form>
        </>
      )}
      {formState === FormState.Failed && (
        <>
          <ErrorSVG className={styles.logo} />
          <h2 className={styles.message}>An error occurred</h2>
          {errorMessage ? (
            <span className={styles.errorDescription}>{errorMessage} </span>
          ) : (
            <span className={styles.errorDescription}>
              Please try again or contact{' '}
              <a href={MAILTO.mailToUrl} className={styles.link}>
                {URL.supportMail}
              </a>
            </span>
          )}
        </>
      )}
      {formState === FormState.Success && (
        <>
          <ConfirmSVG className={styles.logo} />
          <h2 className={styles.message}>We&apos;ll reach out to you shortly</h2>
        </>
      )}
    </Section>
  )
}
