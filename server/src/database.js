const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/firus', {
    useNewUrlParser: true
})
    .then(db => console.log(`DB is connected`))
    .catch(err => console.error(err));