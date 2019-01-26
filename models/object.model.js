const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ObjectSchema = new Schema({
    name: { type: String, required: true, max: 100 },
    lossAddress: { type: String, required: true, max: 1000 },
    contact: { type: String, required: true, max: 100 },
});


// Export the model
module.exports = mongoose.model('Object', ObjectSchema);
