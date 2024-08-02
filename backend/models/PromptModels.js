const mongoose = require('mongoose');

const PromptSchema = mongoose.Schema(
    {
        user: {
            type: String,
            ref: 'User',
            required: true
        },
        prompt: {
            type: String,
            required: true
        },
        tags: {
            type: Array,
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
);

const Prompt = mongoose.model('Prompt', PromptSchema);
module.exports = Prompt;
