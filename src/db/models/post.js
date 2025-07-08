'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Post.belongsTo(models.User, {
        foreignKey: {
          name: 'UserId',
          allowNull: false
        },
        onDelete: 'CASCADE'
      })
      Post.hasMany(models.Comment, {
        foreignKey: {
          name: 'PostId',
          allowNull: false
        }
      })
      Post.belongsToMany(models.Tag, {
        through: models.PostTag
      })
      Post.hasMany(models.Image, {
        foreignKey: {
          name: 'PostId'
        }
      })
    }
  }
  Post.init({
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    publicationDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Post',
    timestamps: false
  })
  return Post
}
