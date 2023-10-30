/*const { Users, UserSchema } = require('../models/usersModel')

function setUpModel(sequelize){ 
    Users.init(UserSchema, Users.config( sequelize )); 
    
}*/

const { Usuarios, UserSchema } = require('../models/usuariosModelo')
const { Articulos,  ArticulosSchema} = require('../models/articulosModelo')
const { Comentarios, ComentariosSchema } = require('../models/comentariosModelo')

function setUpModel(sequelize){ 
   
    Usuarios.init(UserSchema, Usuarios.config( sequelize )); 
    Articulos.init(ArticulosSchema, Articulos.config( sequelize )); 
    Comentarios.init(ComentariosSchema, Comentarios.config( sequelize )); 
    
    Usuarios.associate(sequelize.models);
    Articulos.associate(sequelize.models);
    Comentarios.associate(sequelize.models);
}



module.exports = setUpModel;