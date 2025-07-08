const { User } = require('../db/models')

const checkNickNameNotExists = async (req, res, next) => {
  // Verifica si el nickName recibido en el body NO EXISTE en la base de datos
  try {
    const { nickName } = req.body
    const userExist = await User.findOne({ where: { nickName } })
    if (userExist) return res.status(400).json({ message: 'Ya existe el nicknmae' })
    next()
  } catch (error) {
    console.log(`Error verificando el NickName : ${error}`)
    res.status(500).json({ message: 'Error al del servidor verificando el nickName', error })
  }
}
const checkIdExistInUsers = async (req, res, next) => {
  try {
    const id = req.params.idUser
    const user = await User.findByPk(id)
    if (!user) return res.status(404).json({ message: 'No existe el usuario con id: ' + id })
    next()
  } catch (error) {
    console.log(`Error verificando el idUser : ${error}`)
    res.status(500).json({ message: 'Error al del servidor verificando el id del usuario', error })
  }
}
const checkEmailNotExists = async (req, res, next) => {
  // Verifica si el email recibido en el body NO EXISTE en la base de datos
  try {
    const { email } = req.body
    const emailExist = await User.findOne({ where: { email } })
    if (emailExist) return res.status(400).json({ message: 'Mail existente' })
    next()
  } catch (error) {
    console.log(`Error verificando el correo : ${error}`)
    res.status(500).json({ message: 'Error al del servidor verificando el correo', error })
  }
}
const checkNickNameExists = async (req, res, next) => {
  // Verifica si el nickName recibido en los parametros EXISTE en la base de datos
  try {
    const { nickName } = req.params
    const userExist = await User.findOne({ where: { nickName } })
    if (!userExist) return res.status(400).json({ message: 'NickName inexistente' })
    next()
  } catch (error) {
    console.log(`Error verificando el NickName : ${error}`)
    res.status(500).json({ message: 'Error al del servidor verificando el nickName', error })
  }
}

// Exportacion de las funciones

module.exports = {
  checkNickNameNotExists,
  checkEmailNotExists,
  checkNickNameExists,
  checkIdExistInUsers
}
