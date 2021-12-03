import React, { useState, memo, useEffect } from 'react'
import styles from './CodeWindow.module.scss'
import classNames from 'classnames'
import Prism from 'prismjs'
import { copyToClipboard } from '../../../helpers/clipboard'
import { ReactComponent as CopySVG } from './CopySVG.svg'

interface CodeWindowProps {
  codeCDN?: string
  codeNPM?: string
  hasLineNumbers?: boolean
  singleCode?: string
  language?: string
}

export default memo(function CodeWindow({
  codeCDN,
  codeNPM,
  hasLineNumbers = true,
  singleCode,
  language,
}: CodeWindowProps) {
  const [activeTab, setActiveTab] = useState('CDN')

  useEffect(() => {
    Prism.highlightAll()
  }, [activeTab])

  const handleTab = (tab: string) => {
    setActiveTab(tab)
  }

  const onCopyClick = (text: string) => {
    copyToClipboard(text)
  }

  return (
    <div className={styles.window}>
      <div className={styles.header}>
        <div className={classNames(styles.button, styles.close)} />
        <div className={classNames(styles.button, styles.minimize)} />
        <div className={classNames(styles.button, styles.expand)} />
      </div>
      {codeCDN && codeNPM && (
        <>
          <div className={styles.nav}>
            <ul className={styles.tabs}>
              <li
                className={classNames(styles.tab, { [styles.active]: activeTab === 'CDN' })}
                onClick={() => handleTab('CDN')}
              >
                CDN
              </li>
              <li
                className={classNames(styles.tab, { [styles.active]: activeTab === 'NPM' })}
                onClick={() => handleTab('NPM')}
              >
                NPM
              </li>
            </ul>
            <div className={styles.copy} onClick={() => onCopyClick(activeTab === 'CDN' ? codeCDN : codeNPM)}>
              <CopySVG className={styles.icon} />
              Copy
            </div>
          </div>
          <div className={styles.content}>
            <pre>
              <code
                className={classNames(styles.code, {
                  'line-numbers': hasLineNumbers,
                  'language-html': activeTab === 'CDN',
                  'language-javascript': activeTab === 'NPM',
                })}
              >
                {activeTab === 'CDN' ? codeCDN : codeNPM}
              </code>
            </pre>
          </div>
        </>
      )}
      {singleCode && (
        <div className={styles.content}>
          <pre>
            <code
              className={classNames(
                styles.code,
                {
                  'line-numbers': hasLineNumbers,
                },
                `language-${language}`
              )}
            >
              {singleCode}
            </code>
          </pre>
        </div>
      )}
    </div>
  )
})
