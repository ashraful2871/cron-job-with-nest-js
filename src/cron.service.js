const cron = require('node-cron');

class CronService {
  constructor(db) {
    this.db = db;
    this.jobs = new Map();
  }
  async loadExistingJobs() {
    const jobs = await this.db.collection('cronJobs').find().toArray();
    jobs.forEach((job) => this.scheduleJob(job._id, job));
  }

  scheduleJob(id, jobData) {
    if (this.jobs.has(id)) return;

    const task = cron.schedule(jobData.schedule, async () => {
      console.log(`Executing job: ${jobData.name}`);

      // Simulate API call
      const response = { success: true, timestamp: new Date() };

      await this.db.collection('jobHistory').insertOne({
        jobId: id,
        response,
        createdAt: new Date(),
      });
    });

    this.jobs.set(id, task);
  }

  async loadExistingJobs() {
    const jobs = await this.db.collection('cronJobs').find().toArray();
    jobs.forEach((job) => this.scheduleJob(job._id, job));
  }
}

module.exports = CronService;
