const express = require('express');
const router = express();

const userService = require('../services/userServices');
const user = new userService();

const validatorHandler = require('../middlewares/validation');
const { createUserSchema, updateUserSchema } = require('../schemas/userSchema');
const { checkRoles } = require('../middlewares/auth');



router.delete('/:id', 
    async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await user.deleteUsuario(id, next);
      if (result) {
        res.sendStatus(204).json({ message: 'Usuario eliminado' });
      } else {
        res.status(404).json({ message: 'Usuario no encontr' });
      }
    } catch (error) {
      next(error);
    }
  });

  router.put('/:id',
validatorHandler(updateUserSchema,'body'),// valida los datos antes de ser ingresados a la bd 
async (req, res, next ) => {
    try {
        const { id } = req.params;
        res.send(await user.updateUser(id, req.body))
    } catch (error) {
        next(error);
    }
});

  
router.get('/', async (req, res, next ) => {
    try {
        res.send(await user.getUsers())
    } catch (error) {
        next(error);
    }
});

router.post('/',
    //checkRoles(['admin','seller']),
    validatorHandler(createUserSchema,'body'),// valida los datos antes de ser ingresados a la bd 
    async (req, res, next ) => {
        try {
            res.send(await user.createUsers(req.body))
        } catch (error) {
            next(error);
        }
});



module.exports = router;