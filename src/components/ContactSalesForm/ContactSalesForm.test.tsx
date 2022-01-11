import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import ContactSalesForm from './index'

describe('Contact Sales Form', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it('Will show a success message if the form is submitted correctly', async () => {
    fetchMock.mockResponseOnce('{}', { status: 200 })
    render(<ContactSalesForm />)

    userEvent.type(screen.getByLabelText('Your name'), 'John')
    userEvent.type(screen.getByLabelText('Work email'), 'john@gmail.com')
    userEvent.type(screen.getByLabelText('Company Website'), 'www.test.com')
    userEvent.type(screen.getByLabelText('Tell us about your project'), 'test description')

    userEvent.click(screen.getByRole('button'))
    await screen.findByText('We’ll reach out to you shortly')

    expect(fetchMock).toHaveBeenCalledTimes(1)
  })
  it('Will show an error message if the API returns an error', async () => {
    fetchMock.mockReject(new Error('server error'))
    render(<ContactSalesForm />)

    userEvent.type(screen.getByLabelText('Your name'), 'John')
    userEvent.type(screen.getByLabelText('Work email'), 'john@gmail.com')
    userEvent.type(screen.getByLabelText('Company Website'), 'www.test.com')
    userEvent.type(screen.getByLabelText('Tell us about your project'), 'test description')

    userEvent.click(screen.getByRole('button'))

    await screen.findByText('An error occurred')

    expect(fetchMock).toHaveBeenCalledTimes(1)
  })
})
