const mongoose = require('mongoose');

/**
 * Player schema
 */
const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    rating: Number,
    updated_at: { type: Date, default: Date.now }
});

/**
 * Methods
 */
playerSchema.methods.sayName = () => {
    const greeting = this.name ? 'Meow name is ' + this.name : 'I dont have a name';
    console.log(greeting);
};

/**
 * Statics
 */

module.exports = mongoose.model('Player', playerSchema);
