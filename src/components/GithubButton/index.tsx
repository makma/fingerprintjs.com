import React from 'react'
import { ReactComponent as GithubIconSvg } from './github_icon.svg'
import styles from './GithubButton.module.scss'
import classNames from 'classnames'
import { URL } from '../../constants/content'
import { createNumberFormatter } from '../../helpers/format'

import { useGithubFpjs } from '../../context/GithubContext'

interface GithubButtonProps {
  className?: string | string[]
  variant?: 'primary' | 'white' | 'dark'
}

export default function GithubButton({ className, variant = 'primary' }: GithubButtonProps) {
  const { githubData } = useGithubFpjs()

  const formatter = createNumberFormatter()

  return (
    <a
      className={classNames(styles.button, className, {
        [styles.white]: variant === 'white',
        [styles.dark]: variant === 'dark',
      })}
      href={URL.githubRepoUrl}
    >
      <div className={classNames(styles.label, { [styles.white]: variant === 'white' })}>
        <GithubIconSvg className={classNames(styles.icon, { [styles.white]: variant === 'white' })} />
        <span>Star</span>
      </div>
      {githubData && (
        <div className={classNames(styles.counter, { [styles.white]: variant === 'white' })}>
          {formatter.format(githubData.stargazers_count)}
        </div>
      )}
    </a>
  )
}
