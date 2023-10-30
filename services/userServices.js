const bcrypt =  require('bcrypt');
const { models } = require('../libs/sequelize');

class UserServices {

    constructor(){
        this.table = models.Usuarios;
    }

    async getUsers(){
        const listUsers = await this.table.findAll({
            include: ["articulos"] //
        });
        return listUsers; 
    }
    async createUsers(user){
        const hash  = await bcrypt.hash(user.password,10);
        const data = await this.table.create({
            ...user,
            password: hash
        })
        delete data.dataValues.password; // delete password
        return data;
    }
    async findByEmail (email){
        const user = await this.table.findOne({
            where: {
                email
            }
        })
        return user;
    }
    async updateUser (id, password){

        //const { id, password } = data;
        const hash  = await bcrypt.hash(password.password,10);
        const search = await this.table.findByPk(id);

        await search.update({
            password: hash
        });
        delete search.dataValues.password; // delete password
        //await search.update(password);
        //delete search.dataValues.password; // delete password
        return {updated : true, search};

    }
    async deleteUsuario(id, next) 
    {
        //const { id } = data;
        try {
            const result = await this.table.destroy({
              where: { id },
            });
        
            if (result) {

              
                return result;
                
              } else {
                // Si el artículo no se encontró, puedes lanzar un error personalizado o devolver null
                throw new Error('Usuario no encontrado');
              }
            } catch (error) {
              next(error); // Pasa el error a la función `next` para el manejo global de errores
            }
    }
}

module.exports = UserServices;