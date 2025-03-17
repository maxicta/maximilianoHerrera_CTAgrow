'use strict';

/** @type {import('sequelize-cli').Migration} */

const path = require("path");
const { readFile, parseFile } = require("../../data/fileSync");
const directory = path.join(__dirname, "../../data/shopcars.json");
const shopcars = parseFile(readFile(directory));

shopcars.map((shopcar) => {
  shopcar.createdAt = new Date();
  shopcar.updatedAt = new Date();
})

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Shopcars', shopcars, {});
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
    await queryInterface.bulkDelete('Shopcars', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
