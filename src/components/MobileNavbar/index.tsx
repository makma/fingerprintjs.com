import React from 'react'
import { Link } from 'gatsby'
import { ReactComponent as LinkedInSvg } from '../../img/linkedin.svg'
import { ReactComponent as TwitterSvg } from '../../img/twitter.svg'
import GithubButton from '../GithubButton'
import Button from '../common/Button'
import classNames from 'classnames'
import styles from './MobileNavbar.module.scss'
import { URL, DOC_URL, PATH } from '../../constants/content'
import DropdownMenu from './DropdownMenu'
import SolutionsDropdown from '../SolutionsDropdown/SolutionsDropdown'

export default function MobileNavbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={classNames(styles.links, styles.top)}>
          <Button href={PATH.contactSales} variant='outline'>
            Contact Sales
          </Button>
          <Button href={URL.signupUrl}>Get Started</Button>
        </div>
        <div className={classNames(styles.links, styles.main)}>
          <div className={styles.container}>
            <DropdownMenu name='Solutions' className={styles.link}>
              <SolutionsDropdown />
            </DropdownMenu>

            <Link to={PATH.demoUrl} className={styles.link}>
              Technical Demo
            </Link>
            <Link to={PATH.blog} className={styles.link}>
              Blog
            </Link>
            <Link to={PATH.caseStudies} className={styles.link}>
              Case Studies
            </Link>
            <a href={URL.githubRepoUrl} target='_blank' rel='noreferrer' className={styles.link}>
              Open Source
            </a>
            <Link to={PATH.pricingUrl} className={styles.link}>
              Pricing
            </Link>
            <Link to={PATH.careers} className={styles.link}>
              Careers
            </Link>
            <a href={DOC_URL.documentationUrl} target='_blank' rel='noreferrer' className={styles.link}>
              Docs
            </a>
            <Link to={PATH.support} className={styles.link}>
              Support
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
