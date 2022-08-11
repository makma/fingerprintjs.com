import React, { useState } from 'react'
import { Link } from 'gatsby'
import classNames from 'classnames'
import { ReactComponent as ExpandMoreSvg } from '../../img/expand-more.svg'

import styles from './DropdownMenu.module.scss'

export interface DropdownMenuProps {
  name: string
  list?: Array<{ title: string; url: string; isLocal?: boolean }>
  className?: string
  children?: React.ReactNode
}
export default function DropdownMenu({ name, list, className, children }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className={className}>
        <span onClick={() => setIsOpen(!isOpen)} className={styles.link}>
          {name}
          <ExpandMoreSvg
            className={classNames(styles.icon, {
              [styles.iconIsOpen]: isOpen,
              [styles.iconHover]: typeof isOpen === 'undefined',
            })}
          />
        </span>
        {list && (
          <ul className={classNames(styles.list, { [styles.open]: isOpen })}>
            {list.map(({ title, url, isLocal = true }) => (
              <li key={title}>
                {isLocal ? (
                  <Link to={url} className={styles.link}>
                    {title}
                  </Link>
                ) : (
                  <a href={url} className={styles.link}>
                    {title}
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      {children && <div className={classNames(styles.list, { [styles.open]: isOpen })}>{children}</div>}
    </>
  )
}
