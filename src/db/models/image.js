'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Image.belongsTo(models.Post, {
        foreignKey: {
          name: 'PostId'
        },
        onDelete: 'CASCADE'
      })
    }
  }
  Image.init({
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Image',
    timestamps: false,
    url: ''
  })
  return Image
}
