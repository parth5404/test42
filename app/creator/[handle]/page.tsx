'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { notFound } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Coffee } from 'lucide-react'

async function getCreator(handle: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/creators/${handle}`)
  if (!res.ok) {
    if (res.status === 404) {
      notFound()
    }
    throw new Error('Failed to fetch creator')
  }
  return res.json()
}

export default function CreatorProfile({ params }: { params: { handle: string } }) {
  const [creator, setCreator] = useState<any>(null)
  const [amount, setAmount] = useState('')
  const { isSignedIn, user } = useUser()
  const router = useRouter()

  useState(() => {
    getCreator(params.handle).then(setCreator)
  }, [params.handle])

  if (!creator) {
    return <div>Loading...</div>
  }

  const handleDonation = async () => {
    if (!isSignedIn) {
      // Redirect to sign in
      router.push('/sign-in')
      return
    }

    try {
      const res = await fetch('/api/donate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          creatorHandle: creator.handle,
          amount: parseFloat(amount),
        }),
      })

      if (!res.ok) {
        throw new Error('Failed to create donation')
      }

      const { orderId } = await res.json()

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: parseFloat(amount) * 100,
        currency: "INR",
        name: "Get Me a Chai",
        description: `Donation to ${creator.name}`,
        order_id: orderId,
        handler: function (response: any) {
          alert("Payment successful!")
          // Here you would typically update the donation status on your backend
        },
        prefill: {
          name: user?.fullName,
          email: user?.primaryEmailAddress?.emailAddress,
        },
      }

      const paymentObject = new (window as any).Razorpay(options)
      paymentObject.open()
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to process donation. Please try again.')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-32 h-32">
              <AvatarImage src={creator.avatar} alt={creator.name} />
              <AvatarFallback>{creator.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <CardTitle className="text-3xl">{creator.name}</CardTitle>
              <CardDescription className="text-xl">@{creator.handle}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-center mb-6">{creator.longDescription}</p>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleDonation(); }}>
            <div className="flex items-center space-x-2">
              <Coffee className="w-6 h-6" />
              <span className="text-lg font-semibold">Buy me a chai</span>
            </div>
            <div className="flex space-x-2">
              <Button type="button" variant="outline" onClick={() => setAmount('3')}>$3</Button>
              <Button type="button" variant="outline" onClick={() => setAmount('5')}>$5</Button>
              <Button type="button" variant="outline" onClick={() => setAmount('10')}>$10</Button>
              <Input 
                type="number" 
                placeholder="Custom amount" 
                className="max-w-[150px]" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <Button className="w-full" type="submit">Support {creator.name.split(' ')[0]}</Button>
          </form>
        </CardContent>
        <CardFooter className="justify-between">
          <Button variant="outline">Share</Button>
          <Button variant="outline">Follow</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

