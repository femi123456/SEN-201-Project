const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const db = require('../db');

// @route   POST /api/ai/chat
// @desc    Chat with NileAI assistant
// @access  Public (should be protected)
router.post('/chat', async (req, res) => {
  const { message, userContext, history } = req.body;

  try {
    const resources = await db.resources.find();

    // Check if API KEY exists
    if (!process.env.GEMINI_API_KEY) {
      const lowerMsg = message.toLowerCase();
      const matched = resources.filter(r =>
        r.title.toLowerCase().includes(lowerMsg) ||
        r.category.toLowerCase().includes(lowerMsg) ||
        (r.description && r.description.toLowerCase().includes(lowerMsg))
      ).slice(0, 3);

      let responseText = "I'm NileAI. I noticed you're looking for something! ";
      if (matched.length > 0) {
        responseText += `I found these resources that might help: ${matched.map(m => m.title).join(', ')}.`;
      } else {
        responseText += `I couldn't find exact matches for "${message}", but I'm here to help you navigate your ${userContext.department} resources!`;
      }

      return res.json({
        message: responseText,
        suggestions: matched.length > 0 ? matched : [],
        isFallback: true
      });
    }

    // Initialize Gemini 
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // System instruction is now passed as a separate parameter
    const systemPrompt = `You are NileAI, a helpful academic assistant for Nile University students. 
    The current user is a ${userContext.level} level student in the ${userContext.department} department.
    Here is a list of available resources: ${JSON.stringify(resources.map(r => ({ title: r.title, category: r.category, id: r._id })))}.
    
    When a student asks for materials, refer to these resources specifically. 
    Be professional, encouraging, and concise. 
    If they ask for something not in the list, acknowledge it and suggest they check the "Browse Resources" tab or upload it if they have it.`;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: systemPrompt
    });

    // Ensure history alternates roles (User -> Model -> User -> Model)
    // We filter the history to make sure it follows the protocol
    const chatHistory = history
      .slice(-10) // Keep it short
      .map((h, index, array) => {
        const role = h.role === 'ai' ? 'model' : 'user';
        // If the current role is the same as the previous, we ignore it to prevent crash
        if (index > 0 && (array[index - 1].role === h.role)) {
          return null;
        }
        return {
          role,
          parts: [{ text: h.text }]
        };
      })
      .filter(item => item !== null);

    // If the last message in history is from 'model', Gemini expects the next message from 'user' (which is the new message)
    // This is correct. If history is empty, no problem.

    const chat = model.startChat({
      history: chatHistory,
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    res.json({ message: text });
  } catch (err) {
    console.error('AI Route Error:', err);
    res.status(500).json({ msg: 'AI Assistant is temporarily unavailable', error: err.message });
  }
});

module.exports = router;
