const { Router } = require('express');
const router = Router();

const path = require('path');
const { unlink } = require('fs-extra');

const Image = require('../models/Image');


router.get('/', async (req, res) => {
    const images = await Image.find();
    res.render('index', { images });
});


router.get('/mascotas', async (req,res) => {
  const images = await Image.find();
 return res.json(images);
 });


router.get('/upload', (req, res) => {
    res.render('upload');   //('upload')
});

router.post('/upload', async (req, res) => {
  
  const image = new Image();
  image.title = req.body.title;
  image.sexo = req.body.sexo;
  image.edad = req.body.edad;
  image.tamanio = req.body.tamanio;
  image.raza = req.body.raza;
  image.description = req.body.description;
  image.filename = req.file.filename;
  image.path = '/img/uploads/' + req.file.filename;
  image.originalname = req.file.originalname;
  image.mimetype = req.file.mimetype;
  image.size = req.file.size;

   await image.save();

   res.redirect('/api/image'); //direccion a donde va la imagen   asi estaba /    /api/image/
});

router.get('/image/:id', async (req, res) => { // /api/image/      /image/:id
 
  //res.send('Profile Image');
  const { id } = req.params;
  const image = await Image.findById(id);
  //console.log(image);
  
  res.render('profile', { image }); //
  
});


router.get('/image/:id/delete', async (req, res) => {
 // console.log(req.params.id);
 const { id } = req.params;
 const image = await Image.findByIdAndDelete(id);
 await unlink(path.resolve('./src/public' + image.path));
  res.redirect('/api/image');
});





module.exports = router;