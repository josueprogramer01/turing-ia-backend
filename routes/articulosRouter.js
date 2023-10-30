const express = require('express');
const router = express();

const ArticulosServices = require('../services/articulosServices');
const articulos = new ArticulosServices();

const validatorHandler = require('../middlewares/validation');
const { createArticuloSchema } = require('../schemas/articuloSchema');
//const { deleteArticle } = require('../schemas/articuloSchema');
//const { getArticleSchema } = require('../schemas/articuloSchema');


/* OBTENER POR ID DEL USUARIO*/ 
/*router.get('/:id', 
  //validatorHandler(getArticleSchema,'body'),// valida los datos antes de ser ingresados a la bd 
  async(req, res, next) => {
    try {
      const { id } = req.params;
      res.send(await articulos.findBy(id))
    }
    catch (error){
      next(error);
    }
});*/

router.get('/:id', 
  //validatorHandler(getArticleSchema,'body'),// valida los datos antes de ser ingresados a la bd 
  async(req, res, next) => {
    try {
      const { id } = req.params;
      res.send(await articulos.findByID(id))
    }
    catch (error){
      next(error);
    }
});

  /* ELIMINAR ARTICULOS */
router.delete('/:id', 
//validatorHandler(deleteArticle, 'body'), 
async (req, res, next) => {
try {
  const { id } = req.params;
  const result = await articulos.deleteArticulos(id, next);
  if (result) {
    res.sendStatus(204).json({ message: 'Artículo eliminado' });
  } else {
    res.status(404).json({ message: 'Artículo no encontrado' });
  }
} catch (error) {
  next(error);
}
});

/* CREAR ARTICULOS */
router.post('/',
    validatorHandler(createArticuloSchema,'body'),// valida los datos antes de ser ingresados a la bd 
    async (req, res, next ) => {
        try {
            res.send(await articulos.createArticulos(req.body))
        } catch (error) {
            next(error);
        }
});

  /* OBTENER ARTICULOS */
router.get('/', 
async (req, res, next ) => {
  try {
      res.send(await articulos.getArticulos())
  } catch (error) {
      next(error);
  }
});

  
module.exports = router;