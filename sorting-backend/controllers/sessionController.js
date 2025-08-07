import Session from '../models/Session.js';

export const saveSession = async (req, res) => {
  try {
    const session = new Session({ 
      ...req.body, 
      userId: req.user.id 
    });

    await session.save();
    res.status(201).json({ message: 'Session saved successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.user.id }) // ✅ NO semicolon here
      .sort({ timestamp: -1 })
      .limit(10);
      
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
