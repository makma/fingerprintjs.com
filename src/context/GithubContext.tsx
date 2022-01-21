import React, { createContext, useContext } from 'react'
import { useGithub } from '../hooks/useGithub'

export interface GithubReposResponse {
  stargazers_count: number
}

const GithubContext = createContext<{ githubData?: GithubReposResponse }>({})
export const useGithubFpjs = () => useContext(GithubContext)

export function GithubProvider({ children }: { children: React.ReactNode }) {
  const { githubData } = useGithub('fingerprintjs')

  return <GithubContext.Provider value={{ githubData }}>{children}</GithubContext.Provider>
}

export default GithubContext
