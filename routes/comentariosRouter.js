const express = require('express');
const router = express();

const ComentariosService = require('../services/comentariosService');
const comentarios = new ComentariosService();

const validatorHandler = require('../middlewares/validation');
const { createComentariosSchema } = require('../schemas/comentariosSchema');
//const { deleteComentario } = require('../schemas/comentariosSchema');



router.delete('/:id', 
    //validatorHandler(deleteComentario, 'body'), 
    async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await comentarios.deleteComentarios(id, next);
      if (result) {
        res.sendStatus(204).json({ message: 'Comentario eliminado' });
      } else {
        res.status(404).json({ message: 'Comentario no encontr' });
      }
    } catch (error) {
      next(error);
    }
  });

  router.post('/',
    validatorHandler(createComentariosSchema,'body'),// valida los datos antes de ser ingresados a la bd 
    async (req, res, next ) => {
        try {
            res.send(await comentarios.createComentarios(req.body))
        } catch (error) {
            next(error);
        }
});

/* OBTENER COMENTARIOS */
router.get('/',
 async (req, res, next ) => {
  try {
      res.send(await comentarios.getComentarios())
  } catch (error) {
      next(error);
  }
});




  

module.exports = router;