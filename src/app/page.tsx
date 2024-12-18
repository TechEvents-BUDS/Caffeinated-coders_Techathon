import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Chatbot from '@/components/Chatbot'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white/80 backdrop-blur-sm shadow-xl mb-8">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold text-purple-700 mb-2">Autism Early Signs Explorer</CardTitle>
          <CardDescription className="text-lg text-blue-600">
            Interactive tools and support for parents and caregivers
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="p-4 bg-yellow-100 rounded-lg">
            <p className="text-gray-700">
              This app helps identify potential early signs of autism in children through questionnaires and video analysis. 
              It also provides a platform for discussion, professional consultation, and resources.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/questionnaire">
              <Button size="lg" className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105">
                Start Questionnaire
              </Button>
            </Link>
            <Link href="/video-upload">
              <Button size="lg" variant="outline" className="w-full text-purple-700 border-purple-500 hover:bg-purple-100 font-bold py-3 px-6 rounded-full transition-all duration-300">
                Upload Video for Analysis
              </Button>
            </Link>
            <Link href="/forum">
              <Button size="lg" variant="outline" className="w-full text-green-700 border-green-500 hover:bg-green-100 font-bold py-3 px-6 rounded-full transition-all duration-300">
                Join Discussion Forum
              </Button>
            </Link>
            <Link href="/consult">
              <Button size="lg" variant="outline" className="w-full text-blue-700 border-blue-500 hover:bg-blue-100 font-bold py-3 px-6 rounded-full transition-all duration-300">
                Consult Professionals
              </Button>
            </Link>
            <Link href="/resources">
              <Button size="lg" variant="outline" className="w-full text-yellow-700 border-yellow-500 hover:bg-yellow-100 font-bold py-3 px-6 rounded-full transition-all duration-300">
                Explore Resources
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
      <Chatbot />
    </div>
  )
}

