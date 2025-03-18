'use strict';

/** @type {import('sequelize-cli').Migration} */

const path = require('path');
const { parseFile, readFile } = require('../../data/fileSync');
const directory = path.join(__dirname, "../../data/addresses.json");
const addresses = parseFile(readFile(directory));

addresses.map((address) => {
  address.createdAt = new Date();
  address.updatedAt = new Date();
})

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Addresses', addresses, {})
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Addresses', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
