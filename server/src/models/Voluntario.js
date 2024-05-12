const mongoose = require("mongoose");

const VoluntarioSchema = new mongoose.Schema({
      nombre: String,
      tipo: String,
      direccion: String     
    });

const VoluntarioModel = mongoose.model("voluntarios", VoluntarioSchema);
module.exports = VoluntarioModel;