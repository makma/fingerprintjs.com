import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { micromark } from 'micromark'
import styles from './Content.module.scss'

export function DangerouslyRenderHtmlContent({
  content,
  className,
  useBlogStyles = true,
}: {
  content: string
  className?: string
  useBlogStyles?: boolean
}) {
  return (
    <div
      className={classNames(
        {
          [styles.root]: useBlogStyles,
        },
        className
      )}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

export function Content({ content, className }: { content: string | React.ReactNode; className?: string }) {
  return <div className={classNames(styles.root, className)}>{content}</div>
}

export function MarkdownContent({ markdown, className, useBlogStyles=true }: { markdown: string; className?: string ,useBlogStyles?:boolean}) {
  const [htmlString, setHtmlString] = useState('')

  useEffect(() => {
    async function parseMarkdown(markdown: string) {
      setHtmlString(micromark(markdown))
    }

    parseMarkdown(markdown)
  }, [markdown])

  return <DangerouslyRenderHtmlContent content={htmlString} className={className} useBlogStyles={useBlogStyles} />
}
