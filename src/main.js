const { MongoClient } = require('mongodb');
const { NestFactory } = require('@nestjs/core');
const AppModule = require('./app.module');
const CronController = require('./cron.controller');

const MONGO_URI =
  'mongodb+srv://test:vLSNUVVUoyoxKVun@cluster0.jq7qb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const DB_NAME = 'cronJobDB';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Connect to MongoDB before passing it to the controller
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  console.log('Connected to MongoDB');

  const db = client.db(DB_NAME); // ✅ Now db is defined

  // ✅ Pass `db` to CronController
  const cronRouter = CronController(db);
  app.use('/api', cronRouter); // Attach routes

  await app.listen(3000);
  console.log('Server running at http://localhost:3000');
}

bootstrap();
