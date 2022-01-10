import React from 'react'
import { render } from '@testing-library/react'
import BannerWithCTA from './BannerWithCTA'

describe('Banner with CTA', () => {
  test('Should show conntent', async () => {
    const component = render(
      <BannerWithCTA title='test title' ctaText='button text' ctaHref='/'>
        test description
      </BannerWithCTA>
    )
    console.log(component)
  })
})
