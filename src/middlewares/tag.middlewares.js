const { Tag } = require('../db/models')

// Verifica si el tag recibido ya existe
const existTag = async (req, res, next) => {
  try {
    const newTag = req.body.description
    const descriptionExist = await Tag.findOne({ where: { description: newTag } })
    if (descriptionExist) return res.status(400).json({ message: 'Ya existe el tag' })
    next()
  } catch (e) {
    console.log(`Error: ${e}`)
    res.status(500).json({ error: e })
  }
}

module.exports = { existTag }
