import React, { useState, memo, useEffect } from 'react'
import styles from './CodeWindow.module.scss'
import classNames from 'classnames'
import Prism from 'prismjs'
import { copyToClipboard } from '../../../helpers/clipboard'
import { ReactComponent as CopySVG } from './CopySVG.svg'

interface CodeWindowProps {
  codeBlocks: { type: string; code: string; language: string }[]
  hasLineNumbers?: boolean
}

export default memo(function CodeWindowWithSelector({ codeBlocks, hasLineNumbers = true }: CodeWindowProps) {
  const [activeTab, setActiveTab] = useState(codeBlocks[0])

  const showTabs = codeBlocks.length > 1

  useEffect(() => {
    Prism.highlightAll()
  }, [activeTab])

  const handleTab = (index: number) => {
    setActiveTab(codeBlocks[index])
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
      {showTabs && (
        <>
          <div className={styles.nav}>
            <ul className={styles.tabs}>
              {codeBlocks.map((block, index) => (
                <li
                  key={index}
                  className={classNames(styles.tab, { [styles.active]: activeTab.type === block.type })}
                  onClick={() => handleTab(index)}
                >
                  {block.type}
                </li>
              ))}
            </ul>
            <div className={styles.copy} onClick={() => onCopyClick(activeTab.code)}>
              <CopySVG className={styles.icon} />
              Copy
            </div>
          </div>
          <div className={styles.content}>
            <pre>
              <code
                className={classNames(styles.code, `language-${activeTab.language}`, {
                  'line-numbers': hasLineNumbers,
                })}
              >
                {activeTab.code}
              </code>
            </pre>
          </div>
        </>
      )}
      {!showTabs && (
        <div className={styles.content}>
          <pre>
            <code
              className={classNames(
                styles.code,
                {
                  'line-numbers': hasLineNumbers,
                },
                `language-${activeTab.language}`
              )}
            >
              {activeTab.code}
            </code>
          </pre>
        </div>
      )}
    </div>
  )
})
