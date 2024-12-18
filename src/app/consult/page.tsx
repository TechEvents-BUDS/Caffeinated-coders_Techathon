"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { StarIcon } from 'lucide-react'

interface Professional {
  id: number;
  name: string;
  specialty: string;
  rating: number;
}

const professionals: Professional[] = [
  { id: 1, name: "Dr. Emily Johnson", specialty: "Child Psychiatrist", rating: 4.8 },
  { id: 2, name: "Dr. Michael Lee", specialty: "Developmental Pediatrician", rating: 4.6 },
  { id: 3, name: "Dr. Sarah Thompson", specialty: "Child Psychologist", rating: 4.9 },
]

export default function Consult() {
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null)
  const [message, setMessage] = useState('')
  const [userRating, setUserRating] = useState(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send the consultation request
    alert(`Consultation request sent to ${selectedProfessional?.name}`)
    setMessage('')
  }

  const handleRating = (rating: number) => {
    setUserRating(rating)
    // In a real app, this would update the professional's rating
    alert(`Thank you for rating ${selectedProfessional?.name} ${rating} stars!`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-4">
      <Card className="w-full max-w-4xl mx-auto bg-white/80 backdrop-blur-sm shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-purple-700">Consult Professionals</CardTitle>
          <CardDescription className="text-lg text-blue-600">
            Get expert advice from psychiatrists and doctors specializing in autism
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {professionals.map((prof) => (
              <Card key={prof.id} className={`cursor-pointer transition-all duration-300 ${selectedProfessional?.id === prof.id ? 'ring-2 ring-purple-500' : ''}`} onClick={() => setSelectedProfessional(prof)}>
                <CardHeader>
                  <CardTitle>{prof.name}</CardTitle>
                  <CardDescription>{prof.specialty}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className={`w-5 h-5 ${i < prof.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                    <span className="ml-2">{prof.rating.toFixed(1)}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {selectedProfessional && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Your Name"
                required
              />
              <Input
                type="email"
                placeholder="Your Email"
                required
              />
              <Textarea
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white">
                Request Consultation
              </Button>
            </form>
          )}
          {selectedProfessional && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Rate {selectedProfessional.name}</h3>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`w-8 h-8 cursor-pointer ${i < userRating ? 'text-yellow-400' : 'text-gray-300'}`}
                    onClick={() => handleRating(i + 1)}
                  />
                ))}
              </div>
            </div>
          )}
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

