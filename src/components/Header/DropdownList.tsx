import React from 'react'
import { ReactComponent as ExpandMoreSvg } from '../../img/expand-more.svg'
import { Link } from 'gatsby'
import classNames from 'classnames'

import styles from './DropdownList.module.scss'

//To use react elements as children use the DropdownMenu component
export interface DropdownListProps {
  name: string
  list?: Array<{ title: string; url: string; isLocal?: boolean }>
  onClick?: () => void
  isOpen?: boolean
}
export default function DropdownList({ name, list, onClick, isOpen }: DropdownListProps) {
  return (
    <button type='button' onClick={onClick} className={classNames(styles.dropdown)}>
      <span className={styles.link}>
        {name}
        <ExpandMoreSvg
          className={classNames(styles.icon, {
            [styles.iconIsOpen]: isOpen,
            [styles.iconHover]: typeof isOpen === 'undefined',
          })}
        />
      </span>
      {list && (
        <div className={styles.list}>
          {list.map(({ title, url, isLocal = true }) =>
            isLocal ? (
              <Link to={url} key={title} className={classNames(styles.item, styles.link)}>
                {title}
              </Link>
            ) : (
              <a href={url} key={title} className={classNames(styles.item, styles.link)}>
                {title}
              </a>
            )
          )}
        </div>
      )}
    </button>
  )
}
