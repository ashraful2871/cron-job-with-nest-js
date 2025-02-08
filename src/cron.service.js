class CronService {
  constructor(db) {
    this.db = db;
  }

  async addCronJob(cronJobData) {
    try {
      const result = await this.db
        .collection('cronJobs')
        .insertOne(cronJobData);
      return result.insertedId;
    } catch (err) {
      throw new Error('Error adding cron job: ' + err.message);
    }
  }
}

module.exports = CronService;
