import React from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'
import { StaticImage } from 'gatsby-plugin-image'

import styles from './TeamMembersSection.module.scss'

import { ReactComponent as WorldSVG } from './WorldSVG.svg'

export interface TeamMembersSectionProps {
  totalMembers: number
}

export default function TeamMembersSection({ totalMembers }: TeamMembersSectionProps) {
  const labelNumber = Math.floor(totalMembers / 10) * 10

  return (
    <Section className={styles.root}>
      <Container size='large' className={styles.container}>
        <div className={styles.box}>
          <header className={styles.header}>
            <div className={styles.label}>
              <p className={styles.labelText}>
                {labelNumber}+ team
                <br />
                members
              </p>
            </div>
            <h3 className={styles.headerTitle}>We are global</h3>
            <p className={styles.headerDescription}>
              We are a remote-first and globally distributed team that works from our own time zones. From LA to Toronto
              to St. Petersburg, you can join our team from anywhere in the world!
            </p>
          </header>
          <div className={styles.worldSection}>
            <WorldSVG className={styles.world} />
            <div className={styles.photo1}>
              <StaticImage placeholder='none' src='./photos/Photo1.png' alt='Team Member Photo' />
            </div>
            <div className={styles.photo4}>
              <StaticImage placeholder='none' src='./photos/Photo4.png' alt='Team Member Photo' />
            </div>
            <div className={styles.photo5}>
              <StaticImage placeholder='none' src='./photos/Photo5.png' alt='Team Member Photo' />
            </div>
            <div className={styles.photo6}>
              <StaticImage placeholder='none' src='./photos/Photo6.png' alt='Team Member Photo' />
            </div>
            <div className={styles.photo7}>
              <StaticImage placeholder='none' src='./photos/Photo7.png' alt='Team Member Photo' />
            </div>
            <div className={styles.photo8}>
              <StaticImage placeholder='none' src='./photos/Photo8.png' alt='Team Member Photo' />
            </div>
            <div className={styles.photo10}>
              <StaticImage placeholder='none' src='./photos/Photo10.png' alt='Team Member Photo' />
            </div>
            <div className={styles.photo11}>
              <StaticImage placeholder='none' src='./photos/Photo11.png' alt='Team Member Photo' />
            </div>
            <div className={styles.photo12}>
              <StaticImage placeholder='none' src='./photos/Photo12.png' alt='Team Member Photo' />
            </div>
            <div className={styles.photo13}>
              <StaticImage placeholder='none' src='./photos/Photo13.png' alt='Team Member Photo' />
            </div>
            <div className={styles.photo14}>
              <StaticImage placeholder='none' src='./photos/Photo14.png' alt='Team Member Photo' />
            </div>
            <div className={styles.photo3}>
              <StaticImage placeholder='none' src='./photos/Photo3.png' alt='Team Member Photo' />
            </div>
            <div className={styles.photo16}>
              <StaticImage placeholder='none' src='./photos/Photo16.png' alt='Team Member Photo' />
            </div>
            <div className={styles.photo18}>
              <StaticImage placeholder='none' src='./photos/Photo18.png' alt='Team Member Photo' />
            </div>
            <div className={styles.photo17}>
              <StaticImage placeholder='none' src='./photos/Photo17.png' alt='Team Member Photo' />
            </div>
            <div className={styles.photo20}>
              <StaticImage placeholder='none' src='./photos/Photo20.png' alt='Team Member Photo' />
            </div>
            <div className={styles.photo21}>
              <StaticImage placeholder='none' src='./photos/Photo21.png' alt='Team Member Photo' />
            </div>
            <div className={styles.photo22}>
              <StaticImage placeholder='none' src='./photos/Photo22.png' alt='Team Member Photo' />
            </div>
            <div className={styles.photo23}>
              <StaticImage placeholder='none' src='./photos/Photo23.png' alt='Team Member Photo' />
            </div>
            <div className={styles.photo9}>
              <StaticImage placeholder='none' src='./photos/Photo9.png' alt='Team Member Photo' />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
