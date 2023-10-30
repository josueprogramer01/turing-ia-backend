const Joi = require('joi');
/*VARIABLES PARA CREAR COMENTARIOS EN LA BASE DE DATOS*/
const id = Joi.number().integer();
const content = Joi.string().min(5);
const id_autor = Joi.number().integer();
const id_article = Joi.number().integer();

const createComentariosSchema = Joi.object({
   
    content : content.required(),
    id_autor : id_autor.required(),
    id_article : id_article.required(),
});


const deleteComentario = Joi.object({
    id: id.required(),
});



module.exports = { createComentariosSchema, deleteComentario}