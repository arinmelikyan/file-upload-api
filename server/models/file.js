const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const File = sequelize.define('File', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  fileName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  file: {
    type: DataTypes.BLOB('long'),
    allowNull: false
  }
});

module.exports = File;
