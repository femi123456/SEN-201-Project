const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const db = require('../db');

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy_key');

// @route   POST /api/ai/chat
// @desc    Chat with NileAI assistant
// @access  Public (should be protected)
router.post('/chat', async (req, res) => {
  const { message, userContext, history } = req.body;

  try {
    const resources = await db.resources.find();

    // Check if API KEY exists
    if (!process.env.GEMINI_API_KEY) {
      // Logic for fallback "Smart Filter"
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

    // Real Gemini Implementation
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const systemPrompt = `You are NileAI, a helpful academic assistant for Nile University students. 
    The current user is a ${userContext.level} level student in the ${userContext.department} department.
    Here is a list of available resources: ${JSON.stringify(resources.map(r => ({ title: r.title, category: r.category, id: r.id })))}.
    
    When a student asks for materials, refer to these resources specifically. 
    Be professional, encouraging, and concise. 
    If they ask for something not in the list, acknowledge it and suggest they check the "Browse Resources" tab or upload it if they have it.`;

    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: systemPrompt }] },
        { role: "model", parts: [{ text: "Understood. I am NileAI, ready to assist students with their academic resources." }] },
        ...history.map(h => ({
          role: h.role === 'ai' ? 'model' : 'user',
          parts: [{ text: h.text }]
        }))
      ],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    res.json({ message: text });
  } catch (err) {
    console.error('AI Route Error:', err);
    res.status(500).json({ msg: 'AI Assistant is temporarily unavailable' });
  }
});

module.exports = router;
