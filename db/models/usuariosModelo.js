const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'usuarios';

const UserSchema = {
  id: {
    autoIncrement: true,
    primaryKey: true,
    field: 'id',
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'nombre',
  },
  user: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'nombre_de_usuario',
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'correo_electronico',
    unique: true,
  },
  password: {
    allowNull: false,
    field: 'contrasena',
    type: DataTypes.STRING
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'rol',
    defaultValue: 'user'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'fecha_de_registro',
    defaultValue: Sequelize.NOW
  }
}

class Usuarios extends Model {
  static associate(models) {
    // associate
    this.hasMany(models.Articulos, {
       as:'articulos',
       foreignKey: 'id_autor'
     })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'Usuarios',
      timestamps: false
    }
  }
}


module.exports = { USER_TABLE, UserSchema, Usuarios }