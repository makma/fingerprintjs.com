import React, { FC, ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { FormProvider } from '../hooks/useForm'

const AllTheProviders: FC = ({ children }) => {
  return <FormProvider>{children}</FormProvider>
}

export const renderWithProviders = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
