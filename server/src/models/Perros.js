const mongoose = require("mongoose");

const PerroSchema = new mongoose.Schema({
      image: String 
    });

const PerroModel = mongoose.model("perros", PerroSchema);
module.exports = PerroModel;

/*
const ImageDetailsSchema = new mongoose.Schema({
      image: { type: String }
    });

mongoose.model("ImageDetails", ImageDetailsSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Image = new Schema({
      _id: mongoose.Schema.Types.ObjectId,
      fileName: { type: String },
      urlFile: {type: String },
      dateUpload: {type: Date, default: Date.now() }
    });

module.exports = mongoose.model("Image", Image);



,
    {
     collection: "ImageDetails",
    }

*/