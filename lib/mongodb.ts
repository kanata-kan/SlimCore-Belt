import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI ?? "";

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getClientPromise(): Promise<MongoClient> {
  if (!uri) {
    throw new Error("MONGODB_URI is not set in .env.local");
  }

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri);
      global._mongoClientPromise = client.connect();
    }
    return global._mongoClientPromise;
  }

  client = new MongoClient(uri);
  return client.connect();
}

clientPromise = uri
  ? getClientPromise()
  : (Promise.reject(new Error("MONGODB_URI not set")) as Promise<MongoClient>);

export default clientPromise;
