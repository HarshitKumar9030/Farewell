"use server"

import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function createShortUrl(name: string, classStream: string) {
  const client = await clientPromise
  const db = client.db("farewell-invitations")
  const collection = db.collection("url-mappings")

  const result = await collection.insertOne({
    name,
    classStream,
    createdAt: new Date(),
  })

  return result.insertedId.toString()
}

export async function getUrlData(id: string) {
  const client = await clientPromise
  const db = client.db("farewell-invitations")
  const collection = db.collection("url-mappings")

  if (!ObjectId.isValid(id)) {
    return null
  }

  const result = await collection.findOne({ _id: new ObjectId(id) })
  if (result) {
    return {
      name: result.name,
      classStream: result.classStream,
    }
  }
  return null
}

export async function getAllUrls() {
  const client = await clientPromise
  const db = client.db("farewell-invitations")
  const collection = db.collection("url-mappings")

  const results = await collection.find({}).sort({ createdAt: -1 }).toArray()
  return results.map((result) => ({
    id: result._id.toString(),
    name: result.name,
    classStream: result.classStream,
    createdAt: result.createdAt,
  }))
}

export async function bulkCreateUrls(data: { name: string; classStream: string }[]) {
  const client = await clientPromise
  const db = client.db("farewell-invitations")
  const collection = db.collection("url-mappings")

  const documents = data.map((item) => ({
    ...item,
    createdAt: new Date(),
  }))

  const result = await collection.insertMany(documents)
  return result.insertedIds
}

