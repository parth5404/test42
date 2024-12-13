import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import clientPromise from '@/lib/mongodb'
import Razorpay from 'razorpay'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(request: Request) {
  const { userId } = auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { creatorHandle, amount } = await request.json()

    const client = await clientPromise
    const db = client.db("getmeachai")
    const creator = await db.collection("creators").findOne({ handle: creatorHandle })

    if (!creator) {
      return NextResponse.json({ error: 'Creator not found' }, { status: 404 })
    }

    const order = await razorpay.orders.create({
      amount: amount * 100, // Razorpay expects amount in paise
      currency: 'INR',
      receipt: `donation_${userId}_${Date.now()}`,
    })

    await db.collection("donations").insertOne({
      userId,
      creatorId: creator._id,
      amount,
      orderId: order.id,
      status: 'created',
      createdAt: new Date(),
    })

    return NextResponse.json({ orderId: order.id })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to create donation' }, { status: 500 })
  }
}

