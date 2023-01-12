import Accordion from '../common/Collapsible'
import React from 'react'
import { MarkdownContent } from '../Content/Content'
import styles from './FaqBlock.module.scss'

export interface Faqs {
  title: string
  id: string
  faq: { question: string; answer: string }[]
}

export interface FAQBlocksProps {
  faqBlocks: Faqs[]
  markdown?: boolean
}

export function FAQBlock({ faqBlocks, markdown = false }: FAQBlocksProps) {
  return (
    <div className={styles.faqSection}>
      {faqBlocks.map((faqBlock) => (
        <div className={styles.faq} key={faqBlock.id}>
          <h3 className={styles.faqTitle} id={faqBlock.id}>
            {faqBlock.title}
          </h3>
          <Accordion
            plusIcon
            sections={faqBlock.faq.map((entry) => ({
              title: entry.question,
              content: Content(entry.answer, markdown),
            }))}
          />
        </div>
      ))}
    </div>
  )
}

function Content(content: string, markdown: boolean) {
  return markdown ? (
    <MarkdownContent markdown={content} className={styles.content} useBlogStyles={false} />
  ) : (
    <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }} />
  )
}
