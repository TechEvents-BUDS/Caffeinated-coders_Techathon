import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const resources = [
  {
    title: "Autism Speaks",
    description: "Autism Speaks is dedicated to promoting solutions, across the spectrum and throughout the life span, for the needs of individuals with autism and their families.",
    link: "https://www.autismspeaks.org/"
  },
  {
    title: "National Autistic Society",
    description: "The leading UK charity for autistic people and their families. They provide information, support and pioneering services, and campaign for a better world for autistic people.",
    link: "https://www.autism.org.uk/"
  },
  {
    title: "Autism Society",
    description: "The Autism Society's mission is to create connections, empowering everyone in the Autism community with the resources needed to live fully.",
    link: "https://autismsociety.org/"
  },
  {
    title: "CDC - Autism Information",
    description: "The Centers for Disease Control and Prevention provides information on Autism Spectrum Disorder (ASD), including signs and symptoms, screening and diagnosis, and resources for families.",
    link: "https://www.cdc.gov/ncbddd/autism/index.html"
  }
]

export default function Resources() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-4">
      <Card className="w-full max-w-4xl mx-auto bg-white/80 backdrop-blur-sm shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-purple-700">Autism Resources</CardTitle>
          <CardDescription className="text-lg text-blue-600">
            Helpful information and support for autism awareness
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {resources.map((resource, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{resource.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{resource.description}</p>
              </CardContent>
              <CardFooter>
                <a href={resource.link} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="text-purple-700 border-purple-500 hover:bg-purple-100">
                    Visit Website
                  </Button>
                </a>
              </CardFooter>
            </Card>
          ))}
        </CardContent>
        <CardFooter>
          <Link href="/">
            <Button variant="outline" className="text-purple-700 border-purple-500 hover:bg-purple-100">
              Back to Home
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

