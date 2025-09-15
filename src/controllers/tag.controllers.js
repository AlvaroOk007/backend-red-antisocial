const { Tag } = require('../db/models')
// Get
const getTags = async (_, res) => {
  const data = await Tag.findAll({})
  res.status(200).json(data)
}
// Get
const getTagById = async (req, res) => {
  const data = await Tag.findByPk(req.params.id)
  res.status(200).json(data)
}
// Get para ver los posts que tienen el tag del id x
const verPosts = async (req, res) => {
  const { id } = req.params
  const tag = await Tag.findByPk(id)
  const posts = await tag.getPosts({ joinTableAttributes: [] })
  res.status(200).json(posts)
}
// Post
const createTag = async (req, res) => {
  try {
    const newTag = await Tag.create(req.body)
    res.status(201).json(newTag)
  } catch (e) {
    res.status(400).json({ error: e })
  }
}
// Put
const updateTagById = async (req, res) => {
  const id = req.params.id
  const newDescription = req.body.description
  const tagToUpdate = await Tag.findByPk(id)
  tagToUpdate.description = newDescription
  await tagToUpdate.save()
  res.status(200).json(tagToUpdate)
}
// Delete
const deleteTagById = async (req, res) => {
  const data = await Tag.findByPk(req.params.id)
  const removed = await data.destroy()
  res.status(200).json(`Etiqueta eliminada exitosamente ${removed}`)
}

// Exportacion de todas las funciones
module.exports = { getTags, createTag, getTagById, deleteTagById, updateTagById, verPosts }
