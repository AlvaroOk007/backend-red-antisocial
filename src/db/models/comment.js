'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Comment.belongsTo(models.User, {
        foreignKey: {
          name: 'UserId',
          allowNull: false
        },
        onDelete: 'CASCADE'
      })
      Comment.belongsTo(models.Post, {
        foreignKey: {
          name: 'PostId',
          allowNull: false
        },
        onDelete: 'CASCADE'
      })
    }
  }
  Comment.init({
    content: { type: DataTypes.STRING, allowNull: false },
    publicationDate: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
    isVisible: {
      type: DataTypes.VIRTUAL(DataTypes.BOOLEAN, ['publicationDate']),
      get: function () {
        const xMonths = process.env.MONTHS || 6
        const yearDifference = new Date().getFullYear() - new Date(this.get('publicationDate')).getFullYear()
        const monthDifference = new Date().getMonth() - new Date(this.get('publicationDate')).getMonth()
        return (yearDifference * 12 + monthDifference) < xMonths
      }
    }
  }, {
    sequelize,
    modelName: 'Comment',
    timestamps: false
  })
  return Comment
}
