import React from 'react'
import { Link } from 'gatsby'
import GithubButton from '../GithubButton'
import { ReactComponent as LinkedInSvg } from './linkedin.svg'
import { ReactComponent as TwitterSvg } from './twitter.svg'
import { ReactComponent as SOC2_SVG } from '../../img/SocSVG.svg'
import { ReactComponent as CCPA_SVG } from '../../img/CcpaSVG.svg'
import { ReactComponent as GDPR_SVG } from '../../img/GdprSVG.svg'

import { ReactComponent as FpjsSVG } from '../../../static/img/company-logos/fpjs-white.svg'

import Container from '../common/Container'
import styles from './Footer.module.scss'
import { products, useCaseLinks } from '../../constants/content'
import { PATH, URL, DOC_URL, MAILTO } from '../../constants/content'

interface FooterLinkSection {
  title: string
  links: { title: string; url: string; isLocal?: boolean }[]
}

const footerLinks: FooterLinkSection[] = [
  {
    title: 'Products',
    links: products,
  },
  {
    title: 'General',
    links: [
      {
        title: 'Technical Demo',
        url: `${PATH.demoUrl}`,
        isLocal: true,
      },
      {
        title: 'Open Source',
        url: `${URL.githubRepoUrl}`,
      },
      {
        title: 'Pricing',
        url: `${PATH.pricingUrl}`,
        isLocal: true,
      },
      {
        title: 'Support',
        url: `${MAILTO.mailToUrl}`,
      },
      {
        title: 'Terms of Use',
        url: `${DOC_URL.termOfUseUrl}`,
      },
      {
        title: 'Privacy Policy',
        url: `${DOC_URL.privacyPolicyUrl}`,
      },
      {
        title: 'Careers',
        url: `${URL.careersUrl}`,
      },
      {
        title: 'Login',
        url: `${URL.dashboardLoginUrl}`,
      },
      {
        title: 'System Status',
        url: `${URL.statusUrl}`,
      },
    ],
  },
  {
    title: 'Use Cases',
    links: useCaseLinks,
  },
  {
    title: 'Docs',
    links: [
      {
        title: 'Get Started',
        url: `${DOC_URL.getStartedUrl}`,
      },
      {
        title: 'Pro vs Open Source',
        url: `${DOC_URL.proVsOpenUrl}`,
      },
      {
        title: 'Browser Fingerprinting',
        url: `${DOC_URL.browserFingerprintUrl}`,
      },
      {
        title: 'Incognito Mode Detection',
        url: `${DOC_URL.incognitoUrl}`,
      },
      {
        title: 'Server API',
        url: `${DOC_URL.serverApiUrl}`,
      },
      {
        title: 'Legal',
        url: `${DOC_URL.legalUrl}`,
      },
    ],
  },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container size='large'>
        <nav className={styles.nav}>
          <section className={styles.contact}>
            <FpjsSVG className={styles.fpjsLogo} />
            <address className={styles.address}>
              1440 W. Taylor St #735, Chicago, IL 60607, USA
              <a className={styles.mailto} href={MAILTO.mailToUrl}>
                support@fingerprintjs.com
              </a>
            </address>
            <div className={styles.social}>
              <GithubButton variant='white' />
              <div>
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
          </section>
          <section className={styles.wrapper}>
            {footerLinks.map(({ title, links }) => {
              return (
                <div key={title} className={styles.menu}>
                  <h3 className={styles.title}>{title}</h3>
                  {links.map(({ title, url, isLocal }) => {
                    return isLocal ? (
                      <Link className={styles.link} key={url} to={url} target='_blank' rel='noreferrer'>
                        {title}
                      </Link>
                    ) : (
                      <a className={styles.link} key={url} href={url} target='_blank' rel='noreferrer'>
                        {title}
                      </a>
                    )
                  })}
                </div>
              )
            })}
          </section>
          <section className={styles.logos}>
            <div className={styles.soc2Logo}>
              <SOC2_SVG />
              <CCPA_SVG />
              <GDPR_SVG />
            </div>
            <div className={styles.copyrights}>&copy; 2021 FingerprintJS, Inc</div>
          </section>
        </nav>
      </Container>
    </footer>
  )
}
