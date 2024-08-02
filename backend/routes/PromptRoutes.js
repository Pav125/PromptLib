const express = require('express');
const router = express.Router();
const { getPrompts, createPrompt, getUserPrompts } = require('../controllers/PromptControllers');

// Get all prompts
router.get('/', getPrompts);

// Create a new prompt
router.post('/create', createPrompt);

// Get prompts for a specific user
router.get('/user-prompts', getUserPrompts);

module.exports = router;
