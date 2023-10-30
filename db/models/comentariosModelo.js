const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./usuariosModelo'); 
const { ARTICULO_TABLE } = require('./articulosModelo'); 


const COMENTARIOS_TABLE = 'comentarios';

const ComentariosSchema = {
  id: {
    autoIncrement: true,
    primaryKey: true,
    field: 'id',
    type: DataTypes.INTEGER
  },
  content: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'contenido',
  },
  id_autor: {
    field: 'autor_id',
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE, // Hace referencia al modelo Usuarios
      key: 'id', // Hace referencia a la columna 'id' en el modelo Usuarios
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },

  id_article: {
    field: 'articulo_id',
    type: DataTypes.INTEGER,
    references: {
      model: ARTICULO_TABLE, // Hace referencia al modelo Articulos
      key: 'id', // Hace referencia a la columna 'id' en el modelo Articulos
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'fecha_de_creacion',
    defaultValue: Sequelize.NOW
  }
}

class Comentarios extends Model {
  static associate(models) {
    // Asociación entre Comentarios y Usuarios
    this.belongsTo(models.Usuarios, {
      foreignKey: 'id_autor', // Nombre de la columna en Comentarios que hace referencia a Usuarios
      as: 'autorC', // Alias para la relación
    });

    // Asociación entre Comentarios y Articulos
    this.belongsTo(models.Articulos, {
      foreignKey: 'id_article', // Nombre de la columna en Comentarios que hace referencia a Articulos
      as: 'articuloC', // Alias para la relación
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: COMENTARIOS_TABLE,
      modelName: 'Comentarios',
      timestamps: false
    }
  }
}


module.exports = { COMENTARIOS_TABLE, ComentariosSchema, Comentarios }