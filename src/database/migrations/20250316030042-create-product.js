'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      description: {
        type: Sequelize.STRING(500),
        allowNull: false
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      image: {
        type: Sequelize.STRING(255),
        defaultValue: 'default-image.jpg'
      },
      stock: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      categorieId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'Categories'
          },
          key: 'id'
        },
        onUpdate: 'CASCADE',
        
      },
      brandId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'Brands'
          },
          key: 'id'
        },
        onUpdate: 'CASCADE',
        
      },
      ordershopId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Ordershops'
          },
          key: 'id'
        },
        onUpdate: 'CASCADE',
        
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};
