const mongoose = require('mongoose');

/**
 * Player schema
 */
const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    speed: {
        type: Number,
        min: 1,
        max: 10,
        required: true
    },
    attack: {
        type: Number,
        min: 1,
        max: 10,
        required: true
    },
    defense: {
        type: Number,
        min: 1,
        max: 10,
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
