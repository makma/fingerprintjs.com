import { useEffect, useMemo, useState } from 'react'
import { GITHUB_API_TOKEN } from '../constants/env'
import { URL } from '../constants/content'
import { GithubReposResponse } from '../context/GithubContext'

export const useGithub = (repoName: string) => {
  const [githubData, setGithubData] = useState<GithubReposResponse>()

  const options = useMemo(() => {
    return {
      headers: {
        Authorization: `token ${GITHUB_API_TOKEN}`,
      },
    }
  }, [])

  useEffect(() => {
    async function getGithubData() {
      const response = await fetch(`${URL.githubApiUrl}/${repoName}`, options)
      const status = response.status
      const data = await response.json()

      if (status === 200) {
        setGithubData(data)
      }
    }

    getGithubData()
  }, [options, repoName])
  return { githubData }
}
