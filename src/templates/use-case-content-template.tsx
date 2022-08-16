import React from 'react'
import { LayoutTemplate } from '../components/Layout'
import Section from '../components/common/Section'
import Container from '../components/common/Container'
import { Link } from 'gatsby'
import Button from '../components/common/Button'
import { Content } from '../components/Content/Content'
import { UseCaseProps } from '../components/useCases/UseCase/UseCase'
import JoinCommunitySection from '../components/JoinCommunitySection/JoinCommunitySection'
import RelatedUseCases from '../components/RelatedUseCases/RelatedUseCases'
import { URL } from '../constants/content'
import { useGithubFpjs } from '../context/GithubContext'

import TagList from '../components/TagList/TagList'

import styles from './use-case-content.module.scss'

export interface BottomLink {
  text: string
  url: string
}

export interface CodeBlock {
  iframeUrl?: string
  shareUrl?: string
  docsUrl?: string
}
export interface TemplateProps {
  useCase?: UseCaseProps
  funnel: string[]
  category: string[]
  industry: string[]
  title: string
  description: string
  codeBlock: CodeBlock
  body: string | React.ReactNode
  contentComponent?: React.FunctionComponent<{ content: string | React.ReactNode; className?: string }>
  bottomLinks?: BottomLink[]
}

export default function SolutionContentTemplate({
  useCase,
  funnel,
  category,
  industry,
  title,
  description,
  codeBlock,
  body,
  contentComponent,
  bottomLinks = [],
}: TemplateProps) {
  const ContentComponent = contentComponent ?? Content
  const { githubData } = useGithubFpjs()
  const starsLabel = githubData && {
    labels: [`${Math.floor(githubData?.stargazers_count / 1000)}K+ Stars`],
  }

  return (
    <LayoutTemplate>
      <Section className={styles.root}>
        <Container size='large' className={styles.container}>
          <Link to='/use-cases' className={styles.backLink}>
            ← Back to use cases
          </Link>
          <header className={styles.header}>
            <div className={styles.tags}>
              <TagGroup label='funnel' tags={funnel} />
              <TagGroup label='Category' tags={category} />
              <TagGroup label='Industry' tags={industry} />
            </div>
          </header>
          <section className={styles.titleSection}>
            <h1 className={styles.title}>{title}</h1>
            <h3 className={styles.description}>{description}</h3>
          </section>

          <section className={styles.bodySection}>
            <ContentComponent content={body} className={styles.content} />
            {bottomLinks && (
              <div className={styles.bottomLinks}>
                {bottomLinks.map(({ text, url }) => (
                  <a key={url} href={url} target='_blank' rel='noreferrer'>
                    {text}
                  </a>
                ))}
              </div>
            )}
            {codeBlock.iframeUrl && (
              <section className={styles.codeSection}>
                <h3 className={styles.label}>Explore live technical demo</h3>
                <iframe className={styles.iframe} src={codeBlock.iframeUrl} />
                <div className={styles.buttons}>
                  {codeBlock.shareUrl && (
                    <Button className={styles.button} href={codeBlock.shareUrl} size='big' openNewTab>
                      Run demo in your browser
                    </Button>
                  )}
                  {codeBlock.docsUrl && (
                    <Button className={styles.button} href={codeBlock.docsUrl} variant='outline' size='big' openNewTab>
                      Documentation
                    </Button>
                  )}
                </div>
              </section>
            )}
          </section>
        </Container>
        <JoinCommunitySection
          title='Join the community'
          discordLink={URL.discordServerURL}
          githubLink={URL.githubCommunityRepoUrl}
          {...starsLabel}
        >
          Fingerprint’ open source technology is supported by contributing developers across the globe. Stay up to date
          on our latest technical use cases, integrations and updates.
        </JoinCommunitySection>

        <Container size='large' className={styles.relatedUseCases}>
          {useCase && <RelatedUseCases useCase={useCase} />}
        </Container>
      </Section>
    </LayoutTemplate>
  )
}

interface TagGroupProps {
  tags: string[]
  label: string
}
function TagGroup({ tags, label }: TagGroupProps) {
  return (
    <div className={styles.tag}>
      <span className={styles.tagLabel}>{label}</span>
      <TagList link='/use-cases' className={styles.tagList} tags={tags} format='title' />
    </div>
  )
}
