const Prompt = require('../models/PromptModels')
const User = require('../models/AuthModels')

// Get all prompts
const getPrompts = async (req, res, next) => {
    try {
        const prompts = await Prompt.find().sort({ createdAt: -1 })
        if (prompts) {
            return res.status(200).json(prompts)
        } else {
            return res.status(404).json({ message: 'No prompts found' })
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Error fetching prompts' })
    }
}

// Create a new prompt
const createPrompt = async (req, res, next) => {
    try {
        console.log(req.body);
        const { email, prompt, tags } = req.body;
        if (!email || !prompt) {
            return res.status(400).json({ message: 'Email and prompt are required' });
        }
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const newPrompt = new Prompt({ user: email, prompt, tags });
        await newPrompt.save();
        return res.status(201).json({ message: 'Prompt created successfully' });
    } catch (error) {
        console.error('Error creating prompt:', error);
        return res.status(500).json({ message: 'Error creating prompt', error: error.message });
    }
}

const getUserPrompts = async (req, res, next) => {
    try {
        const { email } = req.query; // Get email from query params
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        
        const prompts = await Prompt.find({ user: email }).sort({ createdAt: -1 });
        if (prompts.length > 0) {
            return res.status(200).json(prompts);
        } else {
            return res.status(404).json({ message: 'No prompts found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching user prompts' });
    }
}

module.exports = {
    getPrompts,
    createPrompt,
    getUserPrompts
}
