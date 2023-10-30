const bcrypt =  require('bcrypt');
const { models } = require('../libs/sequelize');
const { Usuarios } = require('../db/models/usuariosModelo');
const { Articulos } = require('../db/models/articulosModelo');


class ComentariosService {

    constructor(){
        this.table = models.Comentarios;
    }

    /*async getComentarios(){
      const listUsers = await this.table.findAll({
          include: ["articuloC"]
          //include: ["autorC"], //
      });
      return listUsers; 
  }*/

  async getComentarios() {
    const listaComentarios = await this.table.findAll({
      include: [
        {
          model: Usuarios, // Incluye el modelo Usuarios
          as: 'autorC', // Alias de la relación con Usuarios
        },
        {
          model: Articulos, // Incluye el modelo Articulos
          as: 'articuloC', // Alias de la relación con Articulos
        },
      ],
    });
  
    return listaComentarios;
  }
  async createComentarios(data) {

        const {content, id_autor, id_article } = data;
    
        const result = await this.table.create({
            content,
            id_autor,
            id_article,
        });

        return result;
  }
  async deleteComentarios(id, next){

        //const { id } = data;
        try {
            const result = await this.table.destroy({
              where: { id },
            });
        
            if (result) {
              
                return result;
                
              } else {
                // Si el artículo no se encontró, puedes lanzar un error personalizado o devolver null
                throw new Error('Comentario no encontrado');
              }
            } catch (error) {
              next(error); // Pasa el error a la función `next` para el manejo global de errores
            }
  }
    
}

module.exports = ComentariosService;