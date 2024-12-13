import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

async function getCreators() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/creators`)
  if (!res.ok) {
    throw new Error('Failed to fetch creators')
  }
  return res.json()
}

export default async function ExplorePage() {
  const creators = await getCreators()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Explore Creators</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {creators.map((creator: any) => (
          <Card key={creator._id}>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={creator.avatar} alt={creator.name} />
                  <AvatarFallback>{creator.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{creator.name}</CardTitle>
                  <CardDescription>@{creator.handle}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p>{creator.description}</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/creator/${creator.handle}`}>View Profile</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

