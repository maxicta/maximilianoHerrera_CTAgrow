"use strict";

/** @type {import('sequelize-cli').Migration} */

const path = require("path");
const { readFile, parseFile } = require("../../data/fileSync");
const directory = path.join(__dirname, "../../data/brands.json");
const brands = parseFile(readFile(directory));

brands.map((brand) => {
    brand.createdAt = new Date();
    brand.updatedAt = new Date();
})
module.exports = {
    async up(queryInterface, Sequelize) {
        //Add seed commands here.

        await queryInterface.bulkInsert("Brands", brands, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Brands", null, {});
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
