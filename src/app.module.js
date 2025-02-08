const { Module, Global } = require('@nestjs/common');
const MongoProvider = require('./mongodb.provider');
const CronService = require('./cron.service');

class AppModule {}

module.exports = {
  module: AppModule,
  providers: [MongoProvider, CronService],
  exports: ['DATABASE_CONNECTION', CronService],
};
