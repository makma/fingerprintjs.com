import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import Prism from 'prismjs'
import MobileNavbar from '../MobileNavbar'
import Button from '../common/Button'
import Container from '../common/Container'
import { isBrowser } from '../../helpers/detector'
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
}
export default function Header({ notificationBar }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const { pathname } = useLocation()

  useEffect(() => {
    const mobileBodyClass = 'isMobileMenuOpen'
    if (isBrowser() && isMobileMenuOpen) {
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
      {notificationBar && (
        <HeaderBar
          linkUrl={notificationBar.url}
          arrowText={notificationBar.arrowText}
          backgroundColor={notificationBar.backgroundColor}
        >
          {<div dangerouslySetInnerHTML={{ __html: notificationBar.barBody ?? '' }} />}
        </HeaderBar>
      )}
      <header className={styles.header}>
        <div className={styles.nav}>
          <Container size='large' className={styles.root}>
            <nav className={styles.navMain}>
              <div className={styles.navLeft}>
                <Link to='/' className={styles.link} title='Logo'>
                  <LogoSvg className={styles.logo} />
                </Link>
                <DropdownMenu name='Platform' className={styles.desktopOnly}>
                  <Dropdown
                    leftColumns={[{ title: 'Capabilities', list: platformDropdown.capabilities, cardBackground: true }]}
                    rightColumn={{ title: '\u00A0', list: platformDropdown.integrations }}
                  />
                </DropdownMenu>
                <DropdownMenu name='Solutions' className={styles.desktopOnly}>
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
                <DropdownMenu name='Developers' className={styles.desktopOnly}>
                  <Dropdown
                    leftColumns={[{ title: 'Dev Resources', list: devResourcesDropdown, cardBackground: true }]}
                    rightColumn={{ title: 'Community', list: communityDropdown }}
                  />
                </DropdownMenu>
                <DropdownMenu name='Resources' className={styles.desktopOnly}>
                  <Dropdown leftColumns={[{ list: resourcesDropdown, cardBackground: true }]} />
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
                  variant='orangeGradientOutline'
                  className={styles.button}
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
          <MobileNavbar visible={isMobileMenuOpen} />
        </div>
      </header>
    </>
  )
}
