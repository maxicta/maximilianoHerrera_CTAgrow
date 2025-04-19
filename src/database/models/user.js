"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.belongsTo(models.Rol, {
                as: "rols",
                foreignKey: "rolId",
            });
        }
    }

    User.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "El nombre es obligatorio" },
                    notEmpty: { msg: "El nombre no puede estar vacío" },
                    len: {
                        args: [2],
                        msg: "El nombre debe tener al menos 2 caracteres",
                    },
                },
            },
            surname: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "El apellido es obligatorio" },
                    notEmpty: { msg: "El apellido no puede estar vacío" },
                    len: {
                        args: [2],
                        msg: "El apellido debe tener al menos 2 caracteres",
                    },
                },
            },

            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    msg: "El correo ya está registrado",
                },
                validate: {
                    notNull: { msg: "El email es obligatorio" },
                    notEmpty: { msg: "El email no puede estar vacío" },
                    isEmail: { msg: "Debe ser un correo válido" },
                },
            },
            password: DataTypes.STRING,
            token: DataTypes.STRING,
            validate: DataTypes.BOOLEAN,
            lock: DataTypes.BOOLEAN,
            rolId: {
                type: DataTypes.INTEGER,
                defaultValue: 1,
            },

            image: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "User",
        }
    );

    return User;
};
