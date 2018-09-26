const mongoose = require('mongoose');

/**
 * Player schema
 */
const matchSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    teams: [
        {
            players: [
                {
                    id: String
                }
            ],
            score: Number
        }
    ],
    updated_at: { type: Date, default: Date.now }
});

/**
 * Methods
 */
matchSchema.methods.sayName = () => {
    const greeting = this.name ? 'Meow name is ' + this.name : 'I dont have a name';
    console.log(greeting);
};

/**
 * Statics
 */

module.exports = mongoose.model('Match', matchSchema);
