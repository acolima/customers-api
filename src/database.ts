import { MongoClient } from 'mongodb';

const mongoClient = new MongoClient(process.env.MONGO_URI);

await mongoClient.connect();

const databaseName = process.env.DATABASE_NAME;

const db = mongoClient.db(databaseName);

export default db;
