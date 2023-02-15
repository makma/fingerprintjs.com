import React, { useState, useEffect } from 'react'

import Container from '../../common/Container'
import DiagramSection from '../../AccuracySection/DiagramSection/DiagramSection'
import Visits from '../../demo/DemoSection/VisitsSection/Visits/Visits'

import useRollbar from '../../../hooks/useRollbar'
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react'
import { getConfig } from '../../../helpers/fpjs'
import { loadFpjsHistory } from '../../../helpers/api'
import { getErrorMessage } from '../../../helpers/error'
import { VisitorResponse } from '../../../types/visitorResponse'
import VisitsDiagram from '../../demo/DemoSection/VisitsSection/VisitsDiagram/VisitsDiagram'
import styles from './DemoSection.module.scss'

export default function DemoSection() {
  const [currentVisit, setCurrentVisit] = useState<VisitorResponse>()
  const [visitorId, setVisitorId] = useState<string>()
  const [visits, setVisits] = useState<VisitorResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const { getData } = useVisitorData(getConfig, { immediate: false })
  const rollbar = useRollbar()

  useEffect(() => {
    let isCancelled = false
    setIsLoading(true)

    async function fetchVisits() {
      if (!visitorId) {
        const data = await getData({ ignoreCache: true })
        setVisitorId(data?.visitorId)
        const visitsFpjs = [
          {
            ...data,
            browserDetails: {
              browserName: data?.browserName,
              os: data?.os,
              osVersion: data?.osVersion,
              device: data?.device,
            },
          },
        ] as VisitorResponse[]

        setVisits(visitsFpjs)
        setCurrentVisit(visitsFpjs[0])
      }
      if (!visitorId) {
        return
      }
      try {
        const { visits } = await loadFpjsHistory(visitorId)

        if (!isCancelled) {
          setVisits(visits)
          setCurrentVisit(visits[0])
        }
      } catch (e) {
        rollbar.error('Unable to load visits', getErrorMessage(e))
      } finally {
        if (!isCancelled) {
          setIsLoading(false)
        }
      }
    }
    fetchVisits()

    return () => {
      isCancelled = true
    }
  }, [getData, visitorId, rollbar])

  return (
    <>
      <Container className={styles.diagramRoot} size='large'>
        <h1 className={styles.title}>Identify More Visitors With Accuracy</h1>
        <p className={styles.description}>99.5% accuracy in browser identification</p>
      </Container>
      <DiagramSection className={styles.diagramSection} whiteBackground box />
      <Container className={styles.visitsRoot}>
        <h3 className={styles.title}>Recognize returning visitors, even in incognito mode</h3>
        <Visits className={styles.visitsSection} isLoading={isLoading} visits={visits} currentVisit={currentVisit} />
      </Container>
      <Container className={styles.visitsDiagramRoot}>
        <VisitsDiagram thinVersion />
        <h3 className={styles.title}>
          Permanent ID stability,
          <br />
          even with browser upgrades
        </h3>
      </Container>
    </>
  )
}
