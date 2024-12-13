import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("getmeachai")
    const creators = await db.collection("creators").find({}).toArray()
    return NextResponse.json(creators)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to fetch creators' }, { status: 500 })
  }
}

