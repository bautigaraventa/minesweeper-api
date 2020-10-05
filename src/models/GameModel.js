var mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    board: [{ type: Object }],
    mines: { type: Number },
    won: { type: Boolean },
    lost: { type: Boolean },
    player: { type: String },
    timer: { type: Number },
});

mongoose.model('Game', gameSchema);