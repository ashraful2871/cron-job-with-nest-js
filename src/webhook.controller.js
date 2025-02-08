const { Router } = require('express');

function WebhookController(db) {
  const router = Router();

  router.post('/webhook', async (req, res) => {
    try {
      const data = {
        id: new Date().getTime(),
        payload: req.body,
        createdAt: new Date(),
      };
      await db.collection('webhookData').insertOne(data);
      res.json({ success: true, id: data.id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
}

module.exports = WebhookController;
