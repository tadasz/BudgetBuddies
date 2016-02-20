var mongoose = require('mongoose');

var monsterSchema = new mongoose.Schema({
    
    appearance_id: String,
    killed: Boolean,
    date: Date
});

var appearanceSchema = new mongoose.Schema({
    appearance_id: String,
    imageName: String,
    colorHex: String
});

module.exports = mongoose.model('MonsterAppearance', appearanceSchema);
module.exports = mongoose.model('Monster', monsterSchema);


