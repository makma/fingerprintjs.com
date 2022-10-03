import { graphql, useStaticQuery } from 'gatsby'
import React, { useState } from 'react'

import Container from '../../common/Container'
import { IntegrationCardProps } from '../../IntegrationCard/IntegrationCard'
import IntegrationCards from '../../IntegrationCards/IntegrationCards'
import { AnimatePresence, motion } from 'framer-motion'

import classNames from 'classnames'

import styles from './CardsSection.module.scss'

export default function CardsSection() {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(filter: { frontmatter: { title: { eq: "sdks" }, templateKey: { eq: "integration-sdk" } } }) {
        nodes {
          frontmatter {
            integrationSdkCards {
              cardImage {
                childImageSharp {
                  gatsbyImageData(quality: 100, layout: CONSTRAINED, aspectRatio: 1.7)
                }
              }
              description
              docsLink
              githubLink
              title
              category
            }
            integrationSdkCardsMobile {
              cardImage {
                childImageSharp {
                  gatsbyImageData(quality: 100, layout: CONSTRAINED, aspectRatio: 1.7)
                }
              }
              description
              docsLink
              githubLink
              title
              category
            }
            integrationSdkCardsBackend {
              cardImage {
                childImageSharp {
                  gatsbyImageData(quality: 100, layout: CONSTRAINED, aspectRatio: 1.7)
                }
              }
              description
              docsLink
              githubLink
              title
              category
            }
            integrationSdkCardsFrontend {
              cardImage {
                childImageSharp {
                  gatsbyImageData(quality: 100, layout: CONSTRAINED, aspectRatio: 1.7)
                }
              }
              description
              docsLink
              githubLink
              title
              category
            }
          }
        }
      }
    }
  `)
  const frontmatter = data.allMarkdownRemark.nodes[0].frontmatter
  const cards = frontmatter.integrationSdkCards as IntegrationCardProps[]
  const mobileCards = frontmatter.integrationSdkCardsMobile as IntegrationCardProps[]
  const frontendCards = frontmatter.integrationSdkCardsFrontend as IntegrationCardProps[]
  const backendCards = frontmatter.integrationSdkCardsBackend as IntegrationCardProps[]

  const [selectedCategory, setSelectedCategory] = useState<IntegrationCardProps['category']>()
  const [filteredSdks, setFilteredSdks] = useState<IntegrationCardProps[]>(cards)

  const handleSelectedCategory = (category: IntegrationCardProps['category']) => {
    setSelectedCategory(category)

    switch (category) {
      case 'Mobile':
        setFilteredSdks(mobileCards)
        return
      case 'Frontend':
        setFilteredSdks(frontendCards)
        return
      case 'Backend':
        setFilteredSdks(backendCards)
        return
      default:
        setFilteredSdks(cards)
        return
    }
  }

  return (
    <Container size='large' className={styles.container}>
      <div className={styles.filters}>
        <Button isSelected={selectedCategory === undefined} handleSelectedCategory={handleSelectedCategory} />
        <Button
          category='Mobile'
          isSelected={selectedCategory === 'Mobile'}
          handleSelectedCategory={handleSelectedCategory}
        />
        <Button
          category='Frontend'
          isSelected={selectedCategory === 'Frontend'}
          handleSelectedCategory={handleSelectedCategory}
        />
        <Button
          category='Backend'
          isSelected={selectedCategory === 'Backend'}
          handleSelectedCategory={handleSelectedCategory}
        />
      </div>
      <AnimatePresence initial={false} exitBeforeEnter>
        <motion.div key={selectedCategory} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <IntegrationCards cards={filteredSdks} />
        </motion.div>
      </AnimatePresence>
    </Container>
  )
}

interface ButtonProps {
  category?: IntegrationCardProps['category']
  isSelected: boolean
  handleSelectedCategory: React.Dispatch<React.SetStateAction<IntegrationCardProps['category']>>
}

function Button({ category, isSelected, handleSelectedCategory }: ButtonProps) {
  return (
    <div>
      <span
        className={classNames(styles.button, { [styles.selectedButton]: isSelected })}
        onClick={() => handleSelectedCategory(category)}
      >
        {category ?? 'All'}
      </span>
      {isSelected ? (
        <motion.div
          style={{
            left: '0px',
            right: 0,
            height: '4px',
            background: '#F04405',
            zIndex: 0,
          }}
          layoutId='underline'
        />
      ) : null}
    </div>
  )
}
