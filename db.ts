import { MongoClient, Db, Collection } from "mongodb";

const MONGO_URL = process.env.MONGODB_URI!;
if (!MONGO_URL) {
    throw new Error("MONGO_URI environment variable is undefined");
}

const DB_NAME = "cs391-url-shortener";
export const ALIAS_COLLECTION = "alias-collection";

let client: MongoClient | null = null;
let db: Db | null = null;

async function connect(): Promise<Db> {
    if (!client) {
        client = new MongoClient(MONGO_URL);
        await client.connect();
    }
    return client.db(DB_NAME)
}

export default async function getCollection(collectionName: string): Promise<Collection> {
    if (!db) {
        db = await connect();
    }
    return db.collection(collectionName);
}