import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import BannerWithCTA from './BannerWithCTA'

describe('Banner with CTA', () => {
  test('Should show conntent', async () => {
    const component = render(
      <BannerWithCTA title='test title' ctaText='button text' ctaHref='/'>
        test description
      </BannerWithCTA>
    )
    expect(component.container).toHaveTextContent('test description')
  })
})
