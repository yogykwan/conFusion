var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var feedbackSchema = new Schema({
    mychannel: {
        type: String
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    areacode: {
        type: String
    },
    number: {
        type: String
    }
}, {
    timestamps: true
});

var Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;