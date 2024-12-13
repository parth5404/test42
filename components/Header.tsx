import Link from 'next/link'
import { Coffee } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { UserButton, SignInButton, useUser } from '@clerk/nextjs'

export default function Header() {
  const { isSignedIn, user } = useUser()

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b">
      <Link className="flex items-center justify-center" href="/">
        <Coffee className="h-6 w-6" />
        <span className="ml-2 text-2xl font-bold">Get Me a Chai</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/explore">
          Explore
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/about">
          About
        </Link>
      </nav>
      {isSignedIn ? (
        <div className="flex items-center gap-4 ml-4">
          <Link href="/dashboard">Dashboard</Link>
          <UserButton afterSignOutUrl="/" />
        </div>
      ) : (
        <SignInButton mode="modal">
          <Button className="ml-4">Sign In</Button>
        </SignInButton>
      )}
    </header>
  )
}

