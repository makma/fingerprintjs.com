import React from 'react'
import { ReactComponent as GithubIconSvg } from './github_icon.svg'
import styles from './GithubButton.module.scss'
import classNames from 'classnames'
import { URL } from '../../constants/content'
import { numberFormatter } from '../../helpers/format'

import { useGithub } from '../../context/GithubContext'

interface GithubButtonProps {
  className?: string | string[]
  variant?: 'primary' | 'white'
}
export default function GithubButton({ className, variant = 'primary' }: GithubButtonProps) {
  const { githubData } = useGithub()

  return (
    <a
      className={classNames(styles.button, className, { [styles.white]: variant === 'white' })}
      href={URL.githubRepoUrl}
    >
      <div className={classNames(styles.label, { [styles.white]: variant === 'white' })}>
        <GithubIconSvg className={classNames(styles.icon, { [styles.white]: variant === 'white' })} />
        <span>Star</span>
      </div>
      {githubData && (
        <div className={classNames(styles.counter, { [styles.white]: variant === 'white' })}>
          {numberFormatter.format(githubData.stargazers_count)}
        </div>
      )}
    </a>
  )
}
