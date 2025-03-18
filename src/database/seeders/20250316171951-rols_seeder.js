'use strict';

/** @type {import('sequelize-cli').Migration} */

const path = require('path');
const directory = path.join(__dirname, "../../data/rols.json");
const {readFile, parseFile} = require("../../data/fileSync");
const rols = parseFile(readFile(directory))

rols.map((rol) => {
  rol.createdAt = new Date();
  rol.updatedAt = new Date();
})

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:*/
      await queryInterface.bulkInsert('Rols', rols, {});
      /*   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Rols', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
