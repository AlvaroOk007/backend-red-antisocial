const { Comment } = require('../db/models')

const getAllComments = async (_, res) => {
  try {
    const data = await Comment.findAll({})
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor al intentar obtener los comentarios', error })
  }
}

const getCommentById = async (req, res) => {
  try {
    const data = await Comment.findByPk(req.params.id)
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor al obtener un comentario por ID', error })
  }
}

const createComment = async (req, res) => {
  try {
    const newComment = await Comment.create(req.body)
    res.status(201).json(newComment)
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor al crear un comentario', error })
  }
}

const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id)
    comment.content = req.body.content
    await comment.save()
    res.status(200).json(comment)
  } catch (error) {
    res.status(404).json({ message: 'Comentario no encontrado', error })
  }
}

const deleteCommentById = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id)
    const removed = await comment.destroy()
    res.status(200).json(removed)
  } catch (error) {
    res.status(404).json({ message: 'Comentario no encontrado', error })
  }
}

module.exports = { getAllComments, getCommentById, createComment, updateComment, deleteCommentById }
