const bcrypt =  require('bcrypt');
const { models } = require('../libs/sequelize');

class ArticulosServices {

    constructor(){
        this.table = models.Articulos;
    }

    async getArticulos(){
      const listArticulos = await this.table.findAll({
          include: ["autores"] //
      });
      return listArticulos; 
    }
    async createArticulos(data){

        const { title, content, id_autor, category } = data;
    
        const result = await this.table.create({
            title,
            content,
            id_autor,
            category,
        });

        return result;
    }
    async deleteArticulos(id, next){

        //const { id } = data;
        try {
            const result = await this.table.destroy({
              where: { id },
            });
        
            if (result) {

              
                return result;
                
              } else {
                // Si el artículo no se encontró, puedes lanzar un error personalizado o devolver null
                throw new Error('Artículo no encontrado');
              }
            } catch (error) {
              next(error); // Pasa el error a la función `next` para el manejo global de errores
            }
    }
    async findByID (id){
          //const { id_autor } = data;

            const article = await this.table.findAll({
              include: ["autores"],
                where: {
                    id_autor : id
                }
            })
            return article;
    }

}

module.exports = ArticulosServices;