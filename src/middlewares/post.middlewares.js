const { when } = require("joi");
const { User } = require("../db/models");

const canPost = async (req, res, next) => {
  try {
    const idUser = req.params.id;
    const userExist = await User.findOne(idUser);
    if (!userExist) {
      res.status(404).json({ message: "No se encontro el id del usuario" });
    }
    next();
  } catch (error) {
    console.error(`Error al consultar por el id de usuario: ${error}`);
    res.status(500).json({
      message: "Error en el servidor al consultar por el id de usuario",
    });
  }
};

module.exports = { canPost };
