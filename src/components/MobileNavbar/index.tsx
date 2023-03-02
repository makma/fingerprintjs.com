import React from 'react'
import { Link } from 'gatsby'
import { ReactComponent as LinkedInSvg } from '../../img/linkedin.svg'
import { ReactComponent as TwitterSvg } from '../../img/twitter.svg'
import { ReactComponent as LinkedInDarkSvg } from '../../img/linkedinDark.svg'
import { ReactComponent as TwitterDarkSvg } from '../../img/twitterDark.svg'
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

interface MobileNavbarProps {
  darkMode?: boolean
}
export default function MobileNavbar({ darkMode }: MobileNavbarProps) {
  return (
    <nav className={classNames(styles.nav, { [styles.darkNavHeader]: darkMode })}>
      <div className={styles.container}>
        <div className={classNames(styles.links, styles.top)}>
          <Button href={PATH.contactSales} variant={darkMode ? 'orangeDark' : 'orangeGradientOutline'} size='medium'>
            Contact Sales
          </Button>
          <Button variant='orangeGradient' size='medium' href={URL.signupUrl} className={styles.signupButton}>
            Get Started
          </Button>
        </div>
        <div className={classNames(styles.links, styles.main)}>
          <div className={styles.container}>
            <DropdownMenu name='Platform' darkMode={darkMode}>
              <Dropdown
                leftColumns={[{ title: 'Capabilities', list: platformDropdown.capabilities, cardBackground: true }]}
                rightColumn={{ list: platformDropdown.integrations }}
                darkMode={darkMode}
              />
            </DropdownMenu>
            <DropdownMenu name='Solutions' darkMode={darkMode}>
              <Dropdown
                leftColumns={[
                  { title: 'Protect', list: solutionsDropdown.protect },
                  { title: 'Grow', list: solutionsDropdown.grow },
                ]}
                rightColumn={{ title: 'By Industry', list: industryDropdown }}
                bottomLinkText='All Use Cases'
                bottomLinkUrl={PATH.useCases}
                darkMode={darkMode}
              />
            </DropdownMenu>
            <DropdownMenu name='Developers' darkMode={darkMode}>
              <Dropdown
                leftColumns={[{ title: 'Dev Resources', list: devResourcesDropdown, cardBackground: true }]}
                rightColumn={{ title: 'Community', list: communityDropdown }}
                darkMode={darkMode}
              />
            </DropdownMenu>
            <DropdownMenu name='Resources' darkMode={darkMode}>
              <Dropdown leftColumns={[{ list: resourcesDropdown, cardBackground: true }]} darkMode={darkMode} />
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
          <GithubButton variant={darkMode ? 'dark' : 'primary'} />
          <div className={styles.social}>
            <p>Find us on social</p>
            <ul className={styles.links}>
              <li className={styles.link}>
                <a href={URL.linkedinUrl} target='_blank' rel='noreferrer' aria-label='LinkedIn link'>
                  {darkMode ? <LinkedInDarkSvg /> : <LinkedInSvg />}
                </a>
              </li>
              <li className={styles.link}>
                <a href={URL.twitterUrl} target='_blank' rel='noreferrer' aria-label='Twitter link'>
                  {darkMode ? <TwitterDarkSvg /> : <TwitterSvg />}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}
