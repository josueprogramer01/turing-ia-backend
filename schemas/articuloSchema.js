const Joi = require('joi');
/*VARIABLES PARA CREAR ARTICULOS EN LA BASE DE DATOS*/
const id = Joi.number().integer();
const title = Joi.string().min(5);
const content = Joi.string().min(5);
const id_autor = Joi.number().integer();
const category = Joi.string().min(2); 

const createArticuloSchema = Joi.object({
   
    title : title.required(),
    content : content.required(),
    id_autor : id_autor.required(),
    category : category.required(),
});


const deleteArticle = Joi.object({
    id: id.required(),
});


const getArticleSchema = Joi.object({
    id_autor : id_autor.required(),
});


module.exports = { createArticuloSchema, deleteArticle, getArticleSchema}