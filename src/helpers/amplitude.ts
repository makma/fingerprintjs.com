import amplitude from 'amplitude-js'
import { AMPLITUDE_API_KEY, AMPLITUDE_API_ENDPOINT } from '../constants/env'

const amplitudeInit = () => {
  amplitude.getInstance().init(AMPLITUDE_API_KEY, undefined, { apiEndpoint: AMPLITUDE_API_ENDPOINT })
}

export const amplitudeLogEvent = (eventName: string, properties?: Record<string, string>, visitorId?: string) => {
  if (process.env.NODE_ENV !== 'development') {
    amplitudeInit()
    if (visitorId) {
      amplitude.getInstance().setUserProperties({ visitorId })
    }
    amplitude.getInstance().logEvent(eventName, properties)
  } else {
    // eslint-disable-next-line no-console
    console.log(`Amplitude event ${eventName}, visitorId: ${visitorId}, triggered with props:`, properties)
  }
}
