const { PostTag } = require('../db/models')
const { Post } = require('../db/models')
const { Tag } = require('../db/models')

const createTagPost = async (req, res) => {
  try {
    const data = req.body
    const post = await PostTag.create(data)
    res.status(200).json(post)
  } catch (error) {
    console.log('Error en el servidor al intentar crear la etiqueta', error)
    res.status(500).json({ message: 'Error en el servidor', error })
  }
}

const deleteTagPost = async (req, res) => {
  try {
    const { postId, tagId } = req.params
    const post = await Post.findByPk(postId)
    const tag = await Tag.findByPk(tagId)
    if (!post) return res.status(404).json({ message: 'No se encontro el posteo con id ' + postId })
    if (!tag) return res.status(404).json({ message: 'No se encontro el tag con id ' + postId })
    await post.removeTag(tag)
    res.status(200).json(post)
  } catch (error) {
    console.log(
      'Error en el servidor al intentar eliminar la etiqueta de un posteo',
      error
    )
    res.status(500).json({ message: 'Error en el servidor', error })
  }
}

const getTagsOfPost = async (req, res) => {
  try {
    const { postId } = req.params
    const post = await Post.findByPk(postId)
    const postTag = await PostTag.findOne({ where: { PostId: postId } })
    if (post && postTag) {
      const tags = await post.getTags({
        attributes: ['description']
      })
      res.status(200).json(tags)
    } else {
      res.status(404).json({ message: 'No se encontraron etiquetas' })
    }
  } catch (error) {
    console.log(
      'Error en el servidor al intentar obtener las etiquetas de un posteo',
      error
    )
    res.status(500).json({ message: 'Error en el servidor', error })
  }
}

module.exports = {
  createTagPost,
  deleteTagPost,
  getTagsOfPost
}
