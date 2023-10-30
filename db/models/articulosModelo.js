const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./usuariosModelo'); //importar el modelo de Usuarios

const ARTICULO_TABLE = 'articulos';

const ArticulosSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    field: 'id',
    type: DataTypes.INTEGER
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'titulo',
  },
  content: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'contenido',
  },
  id_autor: {
    allowNull: false,
    field: 'autor_id',
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE,//hace referencia al modelo Usuarios
      key: 'id', //hace referencia a la columna 'id' en el modelo Usuarios
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'fecha_de_creacion',
    defaultValue: Sequelize.NOW
  },
  category: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'categoria',
  }
}

class Articulos extends Model {
  static associate(models) {
   // Asociación entre Articulos y Usuarios
   this.belongsTo(models.Usuarios, { // Cambia "hasMany" a "belongsTo" ya que un artículo pertenece a un usuario
    as: 'autores', 
    foreignKey: 'id_autor',
  })
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: ARTICULO_TABLE,
      modelName: 'Articulos',
      timestamps: false
    }
  }
}


module.exports = { ARTICULO_TABLE, ArticulosSchema, Articulos }