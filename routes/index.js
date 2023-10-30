const express = require('express');
const userService = require('./usersRouter');
const articulosService = require('./articulosRouter');
const comentariosService = require('./comentariosRouter');
const passport = require('passport');
const authRoute = require('./authRouter');

const mainRouter = (app)=>{
    const router = express.Router(); // PERMITE PETICIONES HTTP
            
            app.use('/api/v1', router); // Define el path 

            router.use('/auth',authRoute); // Le menciono que endpoints va usar para (/api/v1)/auth /*LOGIN*/
            router.use('/users', userService); /*CREAR USUARIOS*/
            router.use('/userEdit', userService); /*EDITAR USUARIOS*/
            router.use('/userDelete', userService); /*ELIMINAR USUARIOS*/

            router.use('/articulosCrear', articulosService) /*CREAR ARTICULOS*/ 
            router.use('/articulos', articulosService) /*ELIMINAR ARTICULOS*/
            router.use('/articulosLista', articulosService) /*CREAR ARTICULOS*/ 
            router.use('/articulo', articulosService) /*LISTAR ARRICULOS POR ID USER*/ 
            router.use('/articuloID', articulosService) /*LISTAR ARRICULOS POR ID ARTICULO*/ 

            router.use('/crearUnComentario', comentariosService) /*CREAR comentarios*/
            router.use('/comentarios', comentariosService) /*ELIMINAR comentarios*/
            router.use('/comentariosLista', comentariosService) /*LISTAR comentarios*/ 
            
}   

module.exports =  mainRouter ;