'use strict';

/** @type {import('sequelize-cli').Migration} */

const path = require('path');
const directory = path.join(__dirname, "../../data/users.json");
const {parseFile, readFile} = require('../../data/fileSync');
const users = parseFile(readFile(directory));
const bcrypt = require('bcrypt')

users.map((user) => {
  user.createdAt = new Date();
  user.updatedAt = new Date();
  user.password = bcrypt.hashSync(user.password, 10)
})

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:*/
      await queryInterface.bulkInsert('Users', users, {})
      /*   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
