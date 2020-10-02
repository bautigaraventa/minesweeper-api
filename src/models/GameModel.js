var mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    name: { type: String },
});

mongoose.model('Game', gameSchema);