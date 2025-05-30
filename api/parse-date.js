const { parseDate } = require('chrono-node');

module.exports = function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Only POST requests are allowed' });
    }

    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Missing text in request body' });
    }

    const parsedDate = parseDate(text);
    if (!parsedDate) {
      return res.status(422).json({ error: 'Could not parse date' });
    }

    const iso = parsedDate.toISOString().split('T')[0]; // YYYY-MM-DD
    res.status(200).json({ date: iso });
  } catch (err) {
    console.error('🔥 Error in parse-date:', err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
};
