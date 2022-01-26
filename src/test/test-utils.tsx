import React, { FC, ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { FormProvider } from '../hooks/useForm'
import { FpjsProvider } from '../context/FpjsContext'

const AllTheProviders: FC = ({ children }) => {
  return (
    <FpjsProvider>
      <FormProvider>{children}</FormProvider>
    </FpjsProvider>
  )
}

export const renderWithProviders = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
