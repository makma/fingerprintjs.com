import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import Prism from 'prismjs'
import MobileNavbar from '../MobileNavbar'
import Button from '../common/Button'
import Container from '../common/Container'
import HeaderBar from '../../components/HeaderBar/HeaderBar'
import classNames from 'classnames'
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
import { ReactComponent as LogoSvg } from './fpjs.svg'
import { ReactComponent as LogoDarkSvg } from './fpjsDark.svg'

import { scrollToElementById } from '../../helpers/scrollToElementByID'
import { useLocation } from '@reach/router'
import Dropdown from '../Dropdown/Dropdown'

import styles from './Header.module.scss'

interface HeaderProps {
  notificationBar?: {
    arrowText?: string
    barBody?: string
    url?: string
    backgroundColor?: string
  }
  darkMode?: boolean
}
export default function Header({ notificationBar, darkMode }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const { pathname } = useLocation()

  useEffect(() => {
    const mobileBodyClass = 'isMobileMenuOpen'
    if (isMobileMenuOpen) {
      document.body.classList.add(mobileBodyClass)
    } else {
      document.body.classList.remove(mobileBodyClass)
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    Prism.highlightAll()
  }, [])

  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      {notificationBar && !isMobileMenuOpen && (
        <HeaderBar
          linkUrl={notificationBar.url}
          arrowText={notificationBar.arrowText}
          backgroundColor={notificationBar.backgroundColor}
        >
          {<div dangerouslySetInnerHTML={{ __html: notificationBar.barBody ?? '' }} />}
        </HeaderBar>
      )}
      <header className={classNames(styles.header, { [styles.darkHeader]: darkMode })}>
        <div className={styles.nav}>
          <Container size='large' className={styles.root}>
            <nav className={styles.navMain}>
              <div className={styles.navLeft}>
                <Link to='/' className={styles.link} title='Logo'>
                  {darkMode ? <LogoDarkSvg className={styles.logo} /> : <LogoSvg className={styles.logo} />}
                </Link>
                <DropdownMenu darkMode={darkMode} name='Platform' className={styles.desktopOnly}>
                  <Dropdown
                    darkMode={darkMode}
                    leftColumns={[{ title: 'Capabilities', list: platformDropdown.capabilities, cardBackground: true }]}
                    rightColumn={{ title: '\u00A0', list: platformDropdown.integrations }}
                  />
                </DropdownMenu>
                <DropdownMenu darkMode={darkMode} name='Solutions' className={styles.desktopOnly}>
                  <Dropdown
                    darkMode={darkMode}
                    leftColumns={[
                      { title: 'Protect', list: solutionsDropdown.protect },
                      { title: 'Grow', list: solutionsDropdown.grow },
                    ]}
                    rightColumn={{ title: 'By Industry', list: industryDropdown }}
                    bottomLinkText='All Use Cases'
                    bottomLinkUrl={PATH.useCases}
                  />
                </DropdownMenu>
                <DropdownMenu darkMode={darkMode} name='Developers' className={styles.desktopOnly}>
                  <Dropdown
                    darkMode={darkMode}
                    leftColumns={[{ title: 'Dev Resources', list: devResourcesDropdown, cardBackground: true }]}
                    rightColumn={{ title: 'Community', list: communityDropdown }}
                  />
                </DropdownMenu>
                <DropdownMenu darkMode={darkMode} name='Resources' className={styles.desktopOnly}>
                  <Dropdown darkMode={darkMode} leftColumns={[{ list: resourcesDropdown, cardBackground: true }]} />
                </DropdownMenu>
                <Link className={classNames(styles.link, styles.desktopOnly)} to={PATH.pricingUrl}>
                  Pricing
                </Link>
                <Link className={classNames(styles.link, styles.desktopOnly)} to={PATH.demoUrl}>
                  Demo
                </Link>
              </div>
              <div className={styles.navRight}>
                <a
                  className={classNames(styles.desktopOnly, styles.loginLink)}
                  target='_blank'
                  rel='noreferrer'
                  href={URL.dashboardLoginUrl}
                >
                  Login
                </a>
                <Button
                  href={PATH.contactSales}
                  size='medium'
                  variant={darkMode ? 'orangeDark' : 'orangeGradientOutline'}
                  className={styles.button}
                  buttonId='contact-sales-top-nav'
                >
                  Contact Sales
                </Button>

                {pathname === PATH.botD ? (
                  <Button
                    variant='orangeGradient'
                    size='medium'
                    className={styles.signupButton}
                    onClick={() => scrollToElementById('generateKeySection')}
                    openNewTab
                  >
                    Get Started
                  </Button>
                ) : (
                  <Button
                    variant='orangeGradient'
                    size='medium'
                    className={styles.signupButton}
                    href={URL.signupUrl}
                    openNewTab
                    buttonId='get-started-top-nav'
                  >
                    Get Started
                  </Button>
                )}

                <button
                  aria-label='Mobile Menu'
                  className={classNames(styles.mobileToggler, { [styles.isOpen]: isMobileMenuOpen })}
                  onClick={handleToggleMobileMenu}
                >
                  {/* hamburger button */}
                  <span />
                  <span />
                  <span />
                  <span />
                </button>
              </div>
            </nav>
          </Container>
          {isMobileMenuOpen && <MobileNavbar darkMode={darkMode} />}
        </div>
      </header>
    </>
  )
}
