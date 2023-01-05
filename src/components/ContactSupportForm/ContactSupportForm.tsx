import React, { useState, useEffect } from 'react'
import Button from '../common/Button'
import Section from '../common/Section'
import classNames from 'classnames'

import { FormState } from '../../types/FormState'
import { Forms, useForm } from '../../hooks/useForm'
import { contactSupport } from '../../helpers/api'
import { ReactComponent as ConfirmSVG } from './confirmSVG.svg'
import { ReactComponent as ErrorSVG } from './errorSVG.svg'
import { ReactComponent as InfoSVG } from './info.svg'

import { URL, MAILTO } from '../../constants/content'
import { useViewTracking } from '../../context/HistoryListener'
import * as Turing from '@fpjs-incubator/turing'
import { initTuring } from '../../helpers/turing'
import 'react-phone-input-2/lib/style.css'
import Tippy from '@tippyjs/react'

import styles from './ContactSupportForm.module.scss'
import { BOTD_PUBLIC_KEY_TURING, TURING_DEFAULT_SESSION_ID } from '../../constants/env'

import { useUserLocation } from '../../hooks/useUserLocation'
import { getIpRegion } from '../../helpers/region'

export default function ContactSupportForm() {
  const [email, setEmail] = useState('')
  const [description, setDescription] = useState('')
  const [visibleMail, setVisibleMail] = useState(false)
  const [visibleDescription, setVisibleDescription] = useState(false)

  const { formState, errorMessage, updateFormState, updateErrorMessage } = useForm(Forms.ContactSupport)
  const { utmParams } = useViewTracking()
  const { countryRegion, visitorId } = useUserLocation()

  async function handleSubmit(e) {
    e.preventDefault()
    if (email === '') {
      setVisibleMail(true)
      setTimeout(() => {
        setVisibleMail(false)
      }, 4000)
      return
    }
    if (description === '') {
      setVisibleDescription(true)
      setTimeout(() => {
        setVisibleDescription(false)
      }, 4000)
      return
    }
    try {
      let sessionId

      try {
        sessionId = await Turing.execute()
      } catch (error) {
        if (TURING_DEFAULT_SESSION_ID) {
          sessionId = TURING_DEFAULT_SESSION_ID
        } else {
          throw new Error()
        }
      }

      if (!sessionId) {
        throw new Error()
      }

      const ipRegion = getIpRegion(countryRegion)
      const response = await contactSupport({ email, description, utmParams, sessionId, visitorId, ipRegion })
      const status = response.status
      const { ok, error } = await response.json()

      if (status !== 200 || !ok) {
        onError(error)
      } else {
        updateFormState(FormState.Success)
      }
    } catch (error) {
      onError()
    }

    function onError(error?) {
      updateFormState(FormState.Failed)

      if (error?.message) {
        if (error?.data?.[0]?.instancePath) {
          updateErrorMessage(`Validation error for ${error?.data[0]?.instancePath.substring(1)}`)
        } else if (error?.param === 'Turing') {
          updateErrorMessage('The answer to the challenge question was incorrect.')
          return
        } else if (error?.param === 'Email / Phone') {
          updateErrorMessage('The format of your email or phone is incorrect.')
          return
        } else {
          updateErrorMessage(error?.message)
        }
      }
      setTimeout(() => {
        updateFormState(FormState.Default)
      }, 10000)
    }
  }

  useEffect(() => {
    initTuring()
  }, [])

  return (
    <>
      <Section
        className={classNames(
          styles.contactSupportFormSection,
          { [styles.formSection]: formState === FormState.Default || formState === FormState.Loading },
          { [styles.stateSection]: formState === FormState.Failed || formState === FormState.Success }
        )}
      >
        {(formState === FormState.Default || formState === FormState.Loading) && (
          <>
            <h1 className={styles.header}>Contact Fingerprint Support</h1>
            <h2 className={styles.subHeader}>Report issues and ask any questions - we&apos;ll be happy to help!</h2>
            <div className={styles.contactSupportForm} data-sitekey={BOTD_PUBLIC_KEY_TURING}>
              <div className={styles.form}>
                <label className={styles.label} htmlFor='email'>
                  Work email
                </label>
                <Tippy
                  maxWidth={270}
                  content={
                    <div className={styles.warningTooltip}>
                      <InfoSVG />
                      <span> Please fill out this field</span>
                    </div>
                  }
                  visible={visibleMail}
                >
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
                </Tippy>
                <label className={styles.label} htmlFor='description'>
                  Please describe your request
                </label>
                <Tippy
                  maxWidth={270}
                  content={
                    <div className={styles.warningTooltip}>
                      <InfoSVG />
                      <span> Please fill out this field</span>
                    </div>
                  }
                  visible={visibleDescription}
                >
                  <textarea
                    className={styles.textArea}
                    name='description'
                    id='description'
                    rows={3}
                    placeholder='Give us as much detail as possible.'
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={formState === FormState.Loading}
                    required
                  />
                </Tippy>
                <Button
                  className={classNames(styles.button, { [styles.loadingButton]: formState === FormState.Loading })}
                  type='submit'
                  size='big'
                  disabled={formState === FormState.Loading}
                  onClick={handleSubmit}
                >
                  Send
                </Button>
              </div>
            </div>
          </>
        )}
        {formState === FormState.Failed && (
          <>
            <ErrorSVG className={styles.logo} />
            <h2 className={styles.message}>An error occurred</h2>

            <span className={styles.errorDescription}>
              {errorMessage && (
                <>
                  {errorMessage}
                  <br />
                </>
              )}
              Please try again or contact{' '}
              <a href={MAILTO.mailToUrl} className={styles.link}>
                {URL.supportMail}.
              </a>
            </span>
          </>
        )}
        {formState === FormState.Success && (
          <>
            <ConfirmSVG className={styles.logo} />
            <h2 className={styles.message}>We&apos;ll reach out to you shortly</h2>
          </>
        )}
      </Section>
    </>
  )
}
