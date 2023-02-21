import React from 'react'
import { Link } from 'gatsby'
import { ReactComponent as LinkedInSvg } from '../../img/linkedin.svg'
import { ReactComponent as TwitterSvg } from '../../img/twitter.svg'
import GithubButton from '../GithubButton'
import Button from '../common/Button'
import classNames from 'classnames'
import styles from './MobileNavbar.module.scss'
import {
  URL,
  PATH,
  solutionsDropdown,
  industryDropdown,
  devResourcesDropdown,
  communityDropdown,
  platformDropdown,
  resourcesDropdown,
} from '../../constants/content'
import DropdownMenu from '../DropdownMenu/DropdownMenu'
import Dropdown from '../Dropdown/Dropdown'

export default function MobileNavbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={classNames(styles.links, styles.top)}>
          <Button href={PATH.contactSales} variant='orangeGradientOutline' size='medium'>
            Contact Sales
          </Button>
          <Button variant='orangeGradient' size='medium' href={URL.signupUrl}>
            Get Started
          </Button>
        </div>
        <div className={classNames(styles.links, styles.main)}>
          <div className={styles.container}>
            <DropdownMenu name='Platform'>
              <Dropdown
                leftColumns={[{ title: 'Capabilities', list: platformDropdown.capabilities, cardBackground: true }]}
                rightColumn={{ list: platformDropdown.integrations }}
              />
            </DropdownMenu>
            <DropdownMenu name='Solutions'>
              <Dropdown
                leftColumns={[
                  { title: 'Protect', list: solutionsDropdown.protect },
                  { title: 'Grow', list: solutionsDropdown.grow },
                ]}
                rightColumn={{ title: 'By Industry', list: industryDropdown }}
                bottomLinkText='All Use Cases'
                bottomLinkUrl={PATH.useCases}
              />
            </DropdownMenu>
            <DropdownMenu name='Developers'>
              <Dropdown
                leftColumns={[{ title: 'Dev Resources', list: devResourcesDropdown, cardBackground: true }]}
                rightColumn={{ title: 'Community', list: communityDropdown }}
              />
            </DropdownMenu>
            <DropdownMenu name='Resources'>
              <Dropdown leftColumns={[{ list: resourcesDropdown, cardBackground: true }]} />
            </DropdownMenu>
            <Link to={PATH.pricingUrl} className={styles.link}>
              Pricing
            </Link>
            <Link to={PATH.demoUrl} className={styles.link}>
              Demo
            </Link>

            <a href={URL.dashboardLoginUrl} className={styles.link} target='_blank' rel='noreferrer'>
              Login
            </a>
            <a href={URL.signupUrl} className={styles.link} target='_blank' rel='noreferrer'>
              Sign Up
            </a>
          </div>
        </div>

        <div className={styles.contact}>
          <GithubButton />
          <div className={styles.social}>
            <p>Find us on social</p>
            <ul className={styles.links}>
              <li className={styles.link}>
                <a href={URL.linkedinUrl} target='_blank' rel='noreferrer' aria-label='LinkedIn link'>
                  <LinkedInSvg />
                </a>
              </li>
              <li className={styles.link}>
                <a href={URL.twitterUrl} target='_blank' rel='noreferrer' aria-label='Twitter link'>
                  <TwitterSvg />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}
