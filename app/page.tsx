import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Coffee, Heart, Users, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Support Creators with a Cup of Chai
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Get Me a Chai is a simple way to support your favorite creators and receive exclusive content in return.
              </p>
            </div>
            <div className="space-x-4">
              <Button asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/explore">Explore Creators</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Why Choose Get Me a Chai?</h2>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center space-y-3 text-center">
              <Heart className="w-12 h-12 text-primary" />
              <h3 className="text-xl font-bold">Support Creators</h3>
              <p className="text-gray-500 dark:text-gray-400">Directly support your favorite creators with one-time or recurring donations.</p>
            </div>
            <div className="flex flex-col items-center space-y-3 text-center">
              <Zap className="w-12 h-12 text-primary" />
              <h3 className="text-xl font-bold">Exclusive Content</h3>
              <p className="text-gray-500 dark:text-gray-400">Get access to exclusive content from creators you support.</p>
            </div>
            <div className="flex flex-col items-center space-y-3 text-center">
              <Users className="w-12 h-12 text-primary" />
              <h3 className="text-xl font-bold">Build Community</h3>
              <p className="text-gray-500 dark:text-gray-400">Connect with creators and other supporters in a vibrant community.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Get Started?</h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Join thousands of creators already using Get Me a Chai to connect with their supporters.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <form className="flex space-x-2">
                <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" />
                <Button type="submit">Sign Up</Button>
              </form>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                By signing up, you agree to our <Link className="underline underline-offset-2" href="/terms">Terms & Conditions</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

