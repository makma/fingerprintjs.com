import React from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'

import { ReactComponent as WindowSVG } from './WindowSVG.svg'
import { ReactComponent as LocationSVG } from './LocationSVG.svg'

import styles from './LearnMoreAboutSection.module.scss'

export default function LearnMoreAboutSection() {
  const data = useStaticQuery(graphql`
    query {
      customer: file(relativePath: { eq: "Customer.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      customerMobile: file(relativePath: { eq: "CustomerMobile.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Section className={styles.root}>
      <Container className={styles.container} size='large'>
        <section className={styles.imageSection}>
          <Img alt='Customer' fluid={data.customer.childImageSharp.fluid} className={styles.image} />
          <InfoImage />
        </section>
        <section className={styles.imageSectionMobile}>
          <Img alt='Customer' fluid={data.customerMobile.childImageSharp.fluid} />
          <InfoImage />
        </section>
        <section className={styles.descriptionSection}>
          <h1 className={styles.title}>Learn More About Your Customers</h1>
          <p className={styles.description}>
            FingerprintJS Pro collects additional information to better understand your visitors. Use our geolocation
            and device data to build more targeted rules to catch account sharing.
          </p>
          <ul className={styles.tagSection}>
            <li className={styles.tag}>Geolocation</li>
            <li className={styles.tag}>Device details</li>
            <li className={styles.tag}>Incognito browsing</li>
          </ul>
        </section>
      </Container>
    </Section>
  )
}

const InfoImage = () => {
  return (
    <div className={styles.infoSection}>
      <div className={styles.info}>
        <div className={styles.imageWrapper}>
          <LocationSVG className={styles.infoLogo} />
        </div>
        <p className={styles.infoDescription}>Chicago, Illinois</p>
      </div>
      <div className={styles.info}>
        <div className={styles.imageWrapper}>
          <WindowSVG className={styles.infoLogo} />
        </div>
        <p className={styles.infoDescription}>Chrome on MacOS </p>
      </div>
    </div>
  )
}
