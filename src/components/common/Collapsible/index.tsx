import React, { useState } from 'react'
import classNames from 'classnames'
import { ReactComponent as ExpandMoreSvg } from '../../../img/expand-more.svg'
import { ReactComponent as PlusSvg } from '../../../img/plus-icon.svg'
import { ReactComponent as MinusSvg } from '../../../img/minus-icon.svg'
import styles from './Collapsible.module.scss'

interface AccordionProps {
  sections: { title: string; content: React.ReactNode }[]
  plusIcon?: boolean
}
export default function Accordion({ sections, plusIcon }: AccordionProps) {
  const [openSection, setOpenSection] = useState<string | undefined>(undefined)

  return (
    <div className={styles.collapsible}>
      {sections.map((section) => (
        <Collapsible
          key={section.title}
          title={section.title}
          open={openSection === section.title}
          onToggle={(title) => setOpenSection(openSection === title ? undefined : title)}
          plusIcon={plusIcon}
        >
          {section.content}
        </Collapsible>
      ))}
    </div>
  )
}

interface CollapsibleProps {
  title: string
  children: React.ReactNode
  open: boolean
  onToggle: (title: string) => void
  plusIcon?: boolean
}

function Collapsible({ title, children, open, onToggle, plusIcon }: CollapsibleProps) {
  return (
    <div className={classNames(styles.item, { [styles.itemPlus]: plusIcon })}>
      <header
        className={classNames(styles.header, { [styles.headerPlus]: plusIcon }, { [styles.headerOpen]: open })}
        onClick={() => onToggle(title)}
      >
        {title}
        {plusIcon ? (
          <>
            <PlusSvg className={classNames(styles.icon, { [styles.hide]: open }, { [styles.iconPlus]: plusIcon })} />
            <MinusSvg className={classNames(styles.icon, { [styles.hide]: !open }, { [styles.iconPlus]: plusIcon })} />
          </>
        ) : (
          <ExpandMoreSvg className={classNames(styles.icon, { [styles.rotated]: open })} />
        )}
      </header>
      <div className={classNames(styles.content, { [styles.open]: open }, { [styles.contentPlus]: plusIcon })}>
        {children}
      </div>
    </div>
  )
}
