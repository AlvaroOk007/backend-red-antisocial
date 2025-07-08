'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING
      },
      publicationDate: {
        type: Sequelize.DATEONLY
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Posts')
  }
}
