import { createFileNodeFromBuffer } from 'gatsby-source-filesystem'
import { generateImage } from './generate-image.mjs'

export const createSocialCardNode = async (node, { createNode }, getCache, createNodeId) => {
  if (node.internal.type === 'MarkdownRemark') {
    const buffer = await generateImage(node.frontmatter.title)
    return await createFileNodeFromBuffer({
      buffer,
      createNodeId,
      createNode,
      getCache,
      name: 'social-card',
    })
  }
}
