'use strict';
//const {USER_TABLE,UserSchema} = require('../models/usersModel')
const {USER_TABLE,UserSchema} = require('../models/usuariosModelo')
const {ARTICULO_TABLE, ArticulosSchema} = require('../models/articulosModelo')
const {COMENTARIOS_TABLE, ComentariosSchema} = require('../models/comentariosModelo')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(USER_TABLE,UserSchema);
    await queryInterface.createTable(ARTICULO_TABLE,ArticulosSchema);
    await queryInterface.createTable(COMENTARIOS_TABLE,ComentariosSchema);
    
  },
  
  async down (queryInterface) {
    await queryInterface.dropTable(COMENTARIOS_TABLE,ComentariosSchema);
    await queryInterface.dropTable(ARTICULO_TABLE,ArticulosSchema);
    await queryInterface.dropTable(USER_TABLE,UserSchema);
  }
};
