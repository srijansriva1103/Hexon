const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config");

const Cluster = sequelize.define("Cluster", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  region: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Cluster;
