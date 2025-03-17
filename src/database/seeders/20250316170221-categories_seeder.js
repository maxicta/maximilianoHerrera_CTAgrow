"use strict";

/** @type {import('sequelize-cli').Migration} */

const path = require("path");
const { readFile, parseFile } = require("../../data/fileSync");
const directory = path.join(__dirname, "../../data/categories.json");
const categories = parseFile(readFile(directory));

categories.map((cateagorie) => {
    cateagorie.createdAt = new Date();
    cateagorie.updatedAt = new Date();
});

module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example: */
        await queryInterface.bulkInsert("Categories", categories, {});
        /*   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Categories", null, {});
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
