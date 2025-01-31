import { MongoClient, ObjectId } from "mongodb"

const uri = process.env.MONGODB_URI
if (!uri) throw new Error('MONGODB_URI environment variable is not defined')
const client = new MongoClient(uri)

async function connectToDatabase() {
  await client.connect()
  return client.db("farewell-invitations")
}

export async function createShortUrl(name: string, classStream: string) {
  const db = await connectToDatabase()
  const collection = db.collection("url-mappings")

  const result = await collection.insertOne({ name, classStream })
  return result.insertedId.toString()
}

export async function getUrlData(id: string) {
  const db = await connectToDatabase()
  const collection = db.collection("url-mappings")

  try {
    const result = await collection.findOne({ _id: new ObjectId(id) })
    if (result) {
      return { name: result.name, classStream: result.classStream }
    }
  } catch (error) {
    console.error("Error fetching URL data:", error)
  }

  return null
}

