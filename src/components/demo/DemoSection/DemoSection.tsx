import React, { useState, useEffect } from 'react'
import useRollbar from '../../../hooks/useRollbar'
import { VisitorResponse } from '../../../types/visitorResponse'
import { useVisitorData } from '../../../context/FpjsContext'
import { loadFpjsHistory } from '../../../helpers/api'

import VisitorSection, { VisitorSectionLoading } from './VisitorSection/VisitorSection'
import AlgorithmSection from './AlgorithmSection/AlgorithmSection'

export default function DemoSection() {
  const [currentVisit, setCurrentVisit] = useState<VisitorResponse>()
  const [visits, setVisits] = useState<VisitorResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const { visitorData } = useVisitorData()
  const visitorId = visitorData?.visitorId
  const rollbar = useRollbar()

  useEffect(() => {
    let isCancelled = false
    setIsLoading(true)

    async function fetchVisits() {
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
        rollbar.error('Unable to load visits', e)
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
  }, [visitorId, rollbar])

  return (
    <>
      {isLoading ? (
        <VisitorSectionLoading />
      ) : (
        visitorId && (
          <>
            <VisitorSection visitorId={visitorId} visits={visits} currentVisit={currentVisit} />
            <AlgorithmSection />
          </>
        )
      )}
    </>
  )
}
