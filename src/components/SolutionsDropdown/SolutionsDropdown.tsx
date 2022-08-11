import React from 'react'
import { Link } from 'gatsby'

import { ReactComponent as ArrowSVG } from './ArrowSVG.svg'

import { solutionsDropdown, industryDropdown, PATH } from '../../constants/content'

import styles from './SolutionsDropdown.module.scss'

interface SolutionsDropdownProps {
  handleClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void
}
export default function SolutionsDropdown({ handleClick }: SolutionsDropdownProps) {
  return (
    <div className={styles.container}>
      <section className={styles.dropdown}>
        <div className={styles.columns}>
          <Column title='Identify' list={solutionsDropdown.identify} />
          <Column title='Protect' list={solutionsDropdown.protect} />
          <Column title='Grow' list={solutionsDropdown.grow} />
        </div>
        <div className={styles.industryColumn}>
          <p className={styles.industryLabel}>by industry</p>
          {industryDropdown.map(({ title, url }) => (
            <Link key={title} to={url} className={styles.link} onClick={handleClick}>
              <li className={styles.industryRow}>{title}</li>
            </Link>
          ))}
        </div>
        <div className={styles.useCasesRow}>
          <Link to={PATH.useCases} className={styles.useCasesLink} onClick={handleClick}>
            <span>All use cases</span>
            <ArrowSVG className={styles.arrow} />
          </Link>
        </div>
      </section>
    </div>
  )

  interface ColumnProps {
    title: string
    list: Array<{ title: string; url: string; description: string }>
  }
  function Column({ title, list }: ColumnProps) {
    return (
      <div className={styles.column}>
        <p className={styles.label}>{title}</p>
        {list.map(({ title, url, description }) => (
          <Link key={title} to={url} className={styles.columnLink} onClick={handleClick}>
            <li className={styles.row}>
              <h3 className={styles.linkTitle}>{title}</h3>
              <p className={styles.linkDescription}>{description}</p>
            </li>
          </Link>
        ))}
      </div>
    )
  }
}
