'use strict';

/** @type {import('sequelize-cli').Migration} */

const path = require('path');
const { parseFile, readFile } = require('../../data/fileSync');
const directory = path.join(__dirname, '../../data/products.json');
const products = parseFile(readFile(directory));

products.map((product) => {
  product.createdAt = new Date();
  product.updatedAt = new Date();
})

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', products, {});
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
    await queryInterface.bulkDelete('Products', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
