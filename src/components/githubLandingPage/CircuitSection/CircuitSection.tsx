import React, { useEffect, useState, useRef } from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'
import classNames from 'classnames'
import styles from './CircuitSection.module.scss'

import { useScroll } from 'framer-motion'

export default function CircuitSection() {
  const ref = useRef(null)
  const [imageIndex, setImageIndex] = useState(0)
  const numImages = 9
  const indexChange = 1 / numImages

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['end end', 'start start'],
  })

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      const newIndex = Math.round(latest / indexChange)
      setImageIndex(newIndex)
    })
  }, [indexChange, scrollYProgress])
  return (
    <Section className={styles.root}>
      <Container size='large' className={styles.container}>
        <div
          ref={ref}
          className={classNames(styles.imageSection, {
            [styles[`image${imageIndex}`]]: imageIndex >= 2 && imageIndex <= numImages,
          })}
        />
      </Container>
    </Section>
  )
}
