'use strict';

/** @type {import('sequelize-cli').Migration} */

const path = require("path");
const { readFile, parseFile } = require("../../data/fileSync");
const directory = path.join(__dirname, "../../data/ordershops.json");
const ordershops = parseFile(readFile(directory));

ordershops.map((ordershop) => {
  ordershop.createdAt = new Date();
  ordershop.updatedAt = new Date();
})

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Ordershops', ordershops, {});
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
    await queryInterface.bulkDelete('Ordershops', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
