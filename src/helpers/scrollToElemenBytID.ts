export const scrollToElementById = (id: string) => {
  const section = document.querySelector(`#${id}`)
  section && section.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
