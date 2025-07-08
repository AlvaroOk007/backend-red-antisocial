const { User, Post } = require('../db/models')

// Getters --------------------------------------------
const getUsers = async (_, res) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (error) {
    console.log('Error en el servidor al solicitar los usuarios', error)
    res.status(500).json({ message: 'Error en el servidor al solicitar los usuarios', error })
  }
}
const getUserByPk = async (req, res) => {
  try {
    const id = req.params.id
    const user = await User.findByPk(id)
    res.json(user)
  } catch (error) {
    console.log('Error en el servidor al solicitar el usuario', error)
    res.status(500).json({ message: 'Error en el servidor al solicitar el usuario', error })
  }
}
const getUserByNickName = async (req, res) => {
  try {
    const { nickName } = req.params
    const user = await User.findOne({ where: { nickName } })
    res.json(user)
  } catch (error) {
    console.log('Error en el servidor al solicitar un usuario', error)
    res.status(500).json({ message: 'Error en el servidor al solicitar el usuario', error })
  }
}

const getUserWithPosts = async (req, res) => {
  try {
    const { id } = req.params
    const userFind = await User.findOne({
      where: { id },
      include: {
        model: Post,
        attributes: ['description', 'publicationDate']
      }
    })
    res.json(userFind)
  } catch (error) {
    console.log('Error en el servidor al solicitar un usuario', error)
    res.status(500).json({ message: 'Error en el servidor al solicitar el usuario', error })
  }
}

// Post ------------------------------------------
const createUser = async (req, res) => {
  try {
    const userCreated = await User.create(req.body)
    res.status(201).json(userCreated)
  } catch (error) {
    console.log('Error en el servidor al crear un usuario', error)
    res.status(500).json({ message: 'Error en el servidor al agregar el usuario', error })
  }
}

// Put -----------------------------------------
const editUser = async (req, res) => {
  try {
    const { id } = req.params
    const { nickName, email } = req.body
    const userEdite = await User.findByPk(id)
    userEdite.nickName = nickName
    userEdite.email = email
    await userEdite.save()
    res.json(userEdite)
  } catch (error) {
    console.log('Error en el servidor al editar un usuario', error)
    res.status(500).json({ message: 'Error en el servidor al editar el usuario', error })
  }
}

// Delete ----------------------------------------------
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const userDeleted = await User.destroy({ where: { id } })
    res.json(userDeleted)
  } catch (error) {
    console.log('Error en el servidor al intentar eliminar el usuario', error)
    res.status(500).json({ message: 'Error en el servidor', error })
  }
}

// Exportacion de todas las funciones

module.exports = {
  getUsers,
  getUserByPk,
  getUserByNickName,
  createUser,
  editUser,
  deleteUser,
  getUserWithPosts

}
