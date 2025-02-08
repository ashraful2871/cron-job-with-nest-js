// cron.service.js
class CronService {
  constructor(db) {
    this.db = db;
  }

  // ✅ Ensure this method exists
  async addCronJob(cronJobData) {
    try {
      const result = await this.db
        .collection('cronJobs')
        .insertOne(cronJobData);
      return result.insertedId; // return the inserted id
    } catch (err) {
      throw new Error('Error adding cron job: ' + err.message);
    }
  }
}

module.exports = CronService;
