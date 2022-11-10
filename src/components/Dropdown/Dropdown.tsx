import React from 'react'
import { Link } from 'gatsby'

import { ReactComponent as ArrowSVG } from './ArrowSVG.svg'
import classNames from 'classnames'
import styles from './Dropdown.module.scss'

export interface DropdownProps {
  leftColumns?: ColumnProps[]
  rightColumn?: ColumnProps
  bottomLinkText?: string
  bottomLinkUrl?: string
}
export default function Dropdown({ leftColumns, rightColumn, bottomLinkText, bottomLinkUrl }: DropdownProps) {
  const onlyLeftColumn = leftColumns && !rightColumn
  return (
    <div className={styles.container}>
      <section className={styles.dropdown}>
        {leftColumns && (
          <div className={classNames(styles.columns, { [styles.onlyLeft]: onlyLeftColumn })}>
            {leftColumns.map(({ title, list, cardBackground }) => (
              <Column key={title} title={title} list={list} cardBackground={cardBackground} />
            ))}
          </div>
        )}
        {bottomLinkText && bottomLinkUrl && (
          <div className={styles.bottomRow}>
            <Link to={bottomLinkUrl} className={styles.bottomLink}>
              <span>{bottomLinkText}</span>
              <ArrowSVG className={styles.arrow} />
            </Link>
          </div>
        )}

        {rightColumn && (
          <aside className={styles.rightSection}>
            {rightColumn.title && <p className={styles.rightSectionLabel}>{rightColumn.title}</p>}
            <div className={styles.rightColumns}>
              {rightColumn.list.map(({ title, url }) => (
                <Link key={title} to={url} className={styles.link}>
                  <li className={styles.rightSectionRow}>{title}</li>
                </Link>
              ))}
            </div>
          </aside>
        )}
      </section>
    </div>
  )
}
interface ColumnProps {
  title?: string
  cardBackground?: boolean
  list: Array<{ title: string; url: string; description?: string; useCasesLink?: string }>
}
function Column({ title, list, cardBackground }: ColumnProps) {
  return (
    <>
      <div className={styles.column}>
        {title && <p className={styles.label}>{title}</p>}
        <div className={styles.rows}>
          {list.map(({ title, url, description, useCasesLink }) => (
            <div key={title}>
              <Link to={url} className={styles.columnLink}>
                <li className={classNames(styles.row, { [styles.background]: cardBackground })}>
                  <h3 className={styles.linkTitle}>{title}</h3>
                  <p className={styles.linkDescription}>{description}</p>
                </li>
                {useCasesLink && (
                  <Link to={useCasesLink} className={styles.useCasesLink}>
                    <span>See Use Case</span>
                    <ArrowSVG className={styles.arrowBottomLink} />
                  </Link>
                )}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
