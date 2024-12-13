import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function GET(request: Request, { params }: { params: { handle: string } }) {
  try {
    const client = await clientPromise
    const db = client.db("getmeachai")
    const creator = await db.collection("creators").findOne({ handle: params.handle })
    
    if (!creator) {
      return NextResponse.json({ error: 'Creator not found' }, { status: 404 })
    }

    return NextResponse.json(creator)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to fetch creator' }, { status: 500 })
  }
}

