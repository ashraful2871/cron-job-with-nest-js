const express = require('express');
const { MongoClient } = require('mongodb');
const CronController = require('./cron.controller');

const app = express();

app.use(express.json());

const MONGO_URI =
  'mongodb+srv://test:vLSNUVVUoyoxKVun@cluster0.jq7qb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const DB_NAME = 'cronJobDB';

async function bootstrap() {
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  console.log('Connected to MongoDB');

  const db = client.db(DB_NAME); // Get MongoDB connection

  // Attach the cron controller with the MongoDB connection
  const cronRouter = CronController(db);
  app.use('/api', cronRouter); // Attach routes

  app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
  });
}

bootstrap();
