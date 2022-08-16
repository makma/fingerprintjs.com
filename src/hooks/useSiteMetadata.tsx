import { graphql, useStaticQuery } from 'gatsby'

export const useSiteMetadata = () => {
  // It's an exception for CMS integration
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const data = useStaticQuery(
    graphql`
      query SITE_METADATA_QUERY {
        site {
          siteMetadata {
            title
            description
            siteUrl
            image
            twitterUsername
          }
        }
      }
    `
  )

  return data.site.siteMetadata
}
