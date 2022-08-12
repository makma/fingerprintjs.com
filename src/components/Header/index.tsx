import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar'
import { Link } from 'gatsby'
import Prism from 'prismjs'
import GithubButton from '../GithubButton'
import MobileNavbar from '../MobileNavbar'
import Button from '../common/Button'
import Container from '../common/Container'
import { isBrowser } from '../../helpers/detector'
import HeaderBar from '../../components/HeaderBar/HeaderBar'
import classNames from 'classnames'
import { URL, PATH } from '../../constants/content'
import DropdownList from './DropdownList'
import { ReactComponent as LogoSvg } from './fpjs.svg'
import { scrollToElementById } from '../../helpers/scrollToElementByID'
import { useLocation } from '@reach/router'
import SolutionsDropdown from '../SolutionsDropdown/SolutionsDropdown'
import { AnimatePresence, motion } from 'framer-motion'
import ClickOutside from '../../helpers/ClickOutside'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'

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
  const [isSolutionsTabOpen, setIsSolutionsTabOpen] = useState(false)
  const breakpoints = useBreakpoint()

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
  useEffect(() => {
    if (breakpoints.md) {
      setIsSolutionsTabOpen(false)
    }
  }, [breakpoints])

  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  const handleSolutionsDropdown = () => {
    setIsSolutionsTabOpen(!isSolutionsTabOpen)
  }
  const handleClick = () => {
    setIsSolutionsTabOpen(false)
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
      <ClickOutside handleClickOutside={() => setIsSolutionsTabOpen(false)}>
        <header className={styles.header}>
          <Navbar />
          <div className={styles.nav}>
            <Container size='large' className={styles.root}>
              <nav className={styles.navMain}>
                <div className={styles.navLeft}>
                  <Link to='/' className={`${styles.link} ${styles.linkLogo}`} title='Logo'>
                    <LogoSvg className={styles.logo} />
                  </Link>
                  <DropdownList name='Solutions' onClick={handleSolutionsDropdown} isOpen={isSolutionsTabOpen} />
                  <Link className={classNames(styles.link, styles.desktopOnly)} to={PATH.demoUrl}>
                    Demo
                  </Link>
                  <Link className={classNames(styles.link, styles.desktopOnly)} to={PATH.pricingUrl}>
                    Pricing
                  </Link>
                  <Link className={classNames(styles.link, styles.desktopOnly)} to={PATH.careers}>
                    Careers
                  </Link>
                </div>
                <div className={styles.navRight}>
                  <GithubButton className={styles.desktopOnly} />
                  <Button
                    href={PATH.contactSales}
                    variant='outline'
                    className={classNames(styles.desktopOnly, styles.button)}
                  >
                    Contact Sales
                  </Button>
                  {pathname === PATH.botD ? (
                    <Button className={styles.signupButton} onClick={() => scrollToElementById('generateKeySection')}>
                      Get Started
                    </Button>
                  ) : (
                    <Button className={styles.signupButton} href={URL.signupUrl}>
                      Get Started
                    </Button>
                  )}

                  <button
                    aria-label='Mobile Menu'
                    className={classNames(styles.mobileToggler, { [styles.isOpen]: isMobileMenuOpen })}
                    onClick={handleToggleMobileMenu}
                  >
                    <span />
                    <span />
                    <span />
                    <span />
                  </button>
                </div>
              </nav>
            </Container>
            <AnimatePresence initial={false}>
              {isSolutionsTabOpen && (
                <motion.div
                  initial={{
                    opacity: 0,
                    translateY: -15,
                  }}
                  animate={{ opacity: 1, translateY: 0 }}
                  exit={{ opacity: 0, translateY: -15, transition: { duration: 0.15 } }}
                >
                  <SolutionsDropdown handleClick={handleClick} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {isMobileMenuOpen && <MobileNavbar />}
        </header>
      </ClickOutside>
    </>
  )
}
