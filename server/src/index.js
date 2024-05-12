const express = require('express');
const path = require('path');
const uuid = require('uuid/v4');
const cors = require("cors");
const morgan = require('morgan');
const multer = require('multer');

//initialization
const app = express();

require('./database');
//const Image = require('./models/Image');
//const { default: mongoose } = require('mongoose');
const PerroModel = require('./models/Perros');
const VoluntarioModel = require('./models/Voluntario');

//middlewares
app.use(cors());
//app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('src/upload'))

app.use(express.static(path.join(__dirname, 'public'))); //fazt


//static files
//app.use(express.static(path.join(__dirname, '/src/upload')));

//agregado fazt
const rutaimage = require('./routes/index');
//setting
app.set('port', process.env.PORT || 4000);
//fazt
app.set('views', path.join(__dirname, 'views')); //agregado fazt
app.set('view engine','ejs');  //agregado fazt

//perros perdidos
const storage = multer.diskStorage({
   destination: (req, file, cb) => {
     cb(null, 'src/upload')
   },
   filename: (req, file, cb) => {
     cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
   }
})

const upload = multer({
   storage : storage
})


app.post('/upload', upload.single('file'), (req, res) => {
    //console.log(req.file)
    PerroModel.create({image: req.file.filename})
    .then(result => res.json(result))
    .catch(err => console.log(err))
})

app.get('/getImage', async(req, res) => {
  const perros = await PerroModel.find();
  return res.json(perros);
})
//perdidos

//Voluntarios
app.post('/create', (req, res) => {
  VoluntarioModel.create(req.body)
  .then(voluntario => res.json(voluntario))
  .catch(err => res.json(err))
})

//fazt

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
const storageimg = multer.diskStorage({
      destination: path.join(__dirname, 'public/img/uploads'),
      filename: (req, file, cb, filename) => {
         cb(null, uuid() + path.extname(file.originalname));
       }
});
app.use(multer({ storage: storageimg }).single('image'));//agregado fazt

app.use('/api/image', rutaimage); //fazt



//start the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});


/*

//static files
//app.use(express.static(path.join(__dirname, 'uploads')));

app.get("/get-image",  (req, res) => {
  try {
    Images.find({}).then((data) => {
       res.send({ status: "ok", data: data });
    });
  } catch (error) {
       res.json({ status: error});
  }
}) 



app.get("/get-image", async (req, res) => {
    const images = await Images.find({});
    return res.json(images);
   //res.render({imagenes});
}) 


const image = new Images();
  image.filename = req.file.filename;
  image.path = '/uploads/' + req.file.filename;
  image.originalname = req.file.originalname;
  image.mimetype = req.file.mimetype;
  image.size = req.file.size;
 
  await image.save();
 */

  /*
app.get('/getImage', (req, res) => {
  PerroModel.find()
  .then(perros => res.json(perros))
  .catch(err => res.json(err))
})

*/


/*
app.get("/", async (req, res) =>{
    res.send("success!!");
 }) */


/////////////  

//const upload = multer({ dest: "uploads/" });

/*

const storage = multer.diskStorage({ 
   destination: function (req, file, cb){
    cb(null, path.join(__dirname, "/upload")); // cb(null, "uploads/");
   },
   filename: function (req, file, cb){
    cb(null, `${file.filename}-${Date.now()}.${file.mimetype.split('/')[1]}`);// uuid() + path.extname(file.originalname)
   },                    //`${file.filename}-${Date.now()}.${file.mimetype.split('/')[1]}`
});

const upload = multer({ storage: storage });  



app.post('/upload', upload.single('file') ,async (req,res) => {
    const { file, body } = req 
      
    if(file && body) {
      const newImage = new Image({
       _id: new mongoose.Types.ObjectId(),
       fileName : body.name,
       urlFile : `http://localhost:4000/${file.filename}` 
     })

     await newImage.save()
     res.json({
         newImage: newImage
     })
    }
});

app.get('/download', async (req, res) => {
    const images = await Image.find();
    return res.json(images);
});
*/