import React, { memo, useState } from 'react'
import styles from './CodeWindow.module.scss'
import classNames from 'classnames'

interface CodeWindowProps {
  code: string
  language?: string
  hasLineNumbers?: boolean
  hasControls?: boolean
}

export default memo(function CodeWindow({
  code,
  language = 'javascript',
  hasLineNumbers = true,
  hasControls = true,
}: CodeWindowProps) {
  const [codeStyle] = useState(`language-${language}`)
  const [preStyle] = useState(classNames({ 'line-numbers': hasLineNumbers }, `language-${language}`))
  return (
    <div className={styles.window}>
      {hasControls && (
        <div className={styles.header}>
          <div className={classNames(styles.button, styles.close)} />
          <div className={classNames(styles.button, styles.minimize)} />
          <div className={classNames(styles.button, styles.expand)} />
        </div>
      )}
      <div className={styles.content}>
        <pre tabIndex={0} className={preStyle}>
          <code className={codeStyle}>{code}</code>
        </pre>
      </div>
    </div>
  )
})
