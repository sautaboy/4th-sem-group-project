const mongoose = require('mongoose');

const feedbackSchema = mongoose.Schema({

    picture: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    date: {
        type: Date,
        default: Date.now()
    },
    comment: String

});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
