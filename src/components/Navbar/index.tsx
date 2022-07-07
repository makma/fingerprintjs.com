import React from 'react'
import nav from './Navbar.module.scss'
import Container from '../common/Container'
import { DOC_URL, URL, PATH } from '../../constants/content'
import { Link } from 'gatsby'

export default function Navbar() {
  return (
    <div className={nav.top}>
      <Container size='large'>
        <nav className={nav.secondary}>
          <Link className={nav.link} to={PATH.blog}>
            Blog
          </Link>
          <Link className={nav.link} to={PATH.caseStudies}>
            Case Studies
          </Link>
          <a className={nav.link} href={DOC_URL.documentationUrl} target='_blank' rel='noreferrer'>
            Docs
          </a>
          <Link className={nav.link} to={PATH.support}>
            Support
          </Link>
          <a className={nav.link} href={URL.dashboardLoginUrl} target='_blank' rel='noreferrer'>
            Login
          </a>
        </nav>
      </Container>
    </div>
  )
}
