// react-testing-library renders components to document.body, this adds jest-dom's custom assertions
import '@testing-library/jest-dom/extend-expect'

import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()

jest.mock('@fingerprintjs/fingerprintjs-pro')
