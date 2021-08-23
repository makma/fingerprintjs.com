import { useEffect, useState } from 'react'

export const useShowOnScroll = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const winMax = document.documentElement.scrollHeight - document.documentElement.offsetHeight
      const heightToHideFrom = winMax * 0.1

      const winScroll = document.documentElement.scrollTop
      const changeVisibility = winScroll > heightToHideFrom
      setIsVisible(changeVisibility)
    }

    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return isVisible
}
