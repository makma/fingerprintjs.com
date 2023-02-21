const { createFileNodeFromBuffer } = require('gatsby-source-filesystem')
const { generateImage } = require('./generate-image')

exports.createSocialCardNode = async (node, { createNode }, getCache, createNodeId) => {
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
