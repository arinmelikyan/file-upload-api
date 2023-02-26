const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const File = sequelize.define('File', {
  fileName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = File;
