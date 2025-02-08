const { MongoClient } = require('mongodb');

const MONGO_URI =
  'mongodb+srv://test:vLSNUVVUoyoxKVun@cluster0.jq7qb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const DB_NAME = 'cronJobDB';

async function createMongoConnection() {
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  console.log('Connected to MongoDB');
  return client.db(DB_NAME);
}

module.exports = {
  provide: 'DATABASE_CONNECTION',
  useFactory: createMongoConnection,
};
