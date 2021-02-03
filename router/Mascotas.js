const express = require('express');
const router = express.Router();

const Mascota = require('../models/mascota');

router.get('/', async (req, res) => {

   try{

      const arrayMascotasDB = await Mascota.find();
      //console.log(arrayMascotasDB);

      res.render('mascotas', {
         arrayMascotas: arrayMascotasDB
      })

   } catch(err){
      console.log(err);
   }
});   

router.get('/crear', (req, res) => {
   res.render('crear')
}) 

router.post('/', async(req, res) => {
   const body = req.body;
   try {
      await Mascota.create(body);
      res.redirect('/mascotas');

      console.log('Mascota creada: ', body)
   } catch (err) {
      console.log(err);
   }
});

// :id es una variable
router.get('/:id', async(req, res) => {
   
   const id = req.params.id;

   try {
      
      const mascotaDB = await Mascota.findOne({_id: id});
      console.log(mascotaDB);

      res.render('detalle', {
         mascota: mascotaDB,
         error: false
      });

   } catch (err) {
      console.log(err)
      res.render('detalle', {
         error: true,
         mensaje: 'No se encuentra el id seleccionado.'
      });
   }
});

router.delete('/:id', async(req, res) => {
   const id = req.params.id;

   try {
      const mascotaDB = await Mascota.findByIdAndDelete({_id: id});
      
      if(mascotaDB){
         res.json({
            estado: true,
            mensaje: 'Eliminado'
         })
      }else{
         res.json({
            estado: false,
            mensaje: 'Fallo al eliminar'
         })
      }
   } catch (err) {
      console.log(err);
   }
});

// Modificar
router.put('/:id', async(req, res) => {
   const id = req.params.id;
   // Capturamos los datos de los campos (nombre y descripccion)
   const body = req.body;
   
   try {

      const mascotaDB = await Mascota.findByIdAndUpdate(id, body, { useFindAndModify: false });
      console.log(mascotaDB);

      res.json({
         estado: true,
         mensaje: 'Editado'
      })
   } catch (err) {
      console.log(err)
      
      res.json({
         estado: false,
         mensaje: 'Fallo en edicion'
      })
   }
});

module.exports = router;