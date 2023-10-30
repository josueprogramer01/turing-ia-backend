const Joi = require('joi');
/*VARIABLES PARA CREAR USUARIOS EN LA BASE DE DATOS*/
const id = Joi.number().integer();
const name = Joi.string().min(10);
const user = Joi.string().min(5);
const email = Joi.string().email();
const password = Joi.string().min(5);
const role = Joi.string().min(4);

const createUserSchema = Joi.object({
    name: name.required(),
    user: user.required(),
    email: email.required(),
    password: password.required(),
    role: role.required(),
});

const updateUserSchema = Joi.object({
    id: id,
    password : password,
});

const getUserSchema = Joi.object({
    id: id.required(),
});


module.exports = { createUserSchema, updateUserSchema, getUserSchema }