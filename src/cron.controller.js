const { Router } = require('express');

function CronController(db) {
  const router = Router();
  const cronService = new (require('./cron.service'))(db);

  router.post('/cron-jobs', async (req, res) => {
    try {
      const id = await cronService.addCronJob(req.body);
      res.json({ success: true, id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get('/cron-jobs', async (req, res) => {
    const jobs = await db.collection('cronJobs').find().toArray();
    res.json(jobs);
  });

  return router;
}

module.exports = CronController;
