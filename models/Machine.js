const { DataTypes } = require("sequelize");
const sequelize = require("../config");

const Machine = sequelize.define("Machine", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ipAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  instanceType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Machine;
