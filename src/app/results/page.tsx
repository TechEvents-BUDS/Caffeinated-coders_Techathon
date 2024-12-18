import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react'

export default function Results({ searchParams }: { searchParams: { score: string } }) {
  const score = parseInt(searchParams.score)
  
  let resultMessage = ""
  let resultIcon = null
  let resultColor = ""
  let recommendations = []

  if (score <= 1) {
    resultMessage = "Based on your responses, there are currently no significant indicators of autism. However, child development varies, and if you have any concerns, please consult with a healthcare professional."
    resultIcon = <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
    resultColor = "text-green-700"
    recommendations = [
      "Continue monitoring your child's development",
      "Engage in activities that promote social interaction and communication",
      "Read to your child regularly to encourage language development",
    ]
  } else if (score <= 3) {
    resultMessage = "Based on your responses, there are some potential indicators that may warrant further evaluation. It's recommended to discuss these observations with a pediatrician or child development specialist."
    resultIcon = <AlertTriangle className="w-16 h-16 text-yellow-500 mb-4" />
    resultColor = "text-yellow-700"
    recommendations = [
      "Schedule an appointment with your pediatrician to discuss your concerns",
      "Keep a detailed record of your child's behaviors and developmental milestones",
      "Consider early intervention services, which can be beneficial regardless of a formal diagnosis",
      "Explore activities that encourage joint attention and social interaction",
    ]
  } else {
    resultMessage = "Based on your responses, there are several indicators that suggest a higher likelihood of autism. It's strongly recommended to consult with a pediatrician or child development specialist for a comprehensive evaluation as soon as possible."
    resultIcon = <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
    resultColor = "text-red-700"
    recommendations = [
      "Schedule an immediate evaluation with a developmental pediatrician or autism specialist",
      "Look into early intervention programs in your area",
      "Join support groups for parents of children with autism or suspected autism",
      "Learn about Applied Behavior Analysis (ABA) and other evidence-based interventions",
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white/80 backdrop-blur-sm shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-purple-700 mb-2">Screening Results</CardTitle>
          <CardDescription className="text-xl text-blue-600">Preliminary Assessment</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          {resultIcon}
          <p className={`mb-6 text-lg ${resultColor}`}>{resultMessage}</p>
          <div className="bg-yellow-100 p-4 rounded-lg mb-6">
            <p className="text-gray-700 font-bold">Important Reminder:</p>
            <p className="text-gray-600">This screening tool is not a diagnostic instrument. A proper diagnosis can only be made by qualified healthcare professionals.</p>
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold mb-2">Recommendations:</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              {recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Link href="/">
            <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105">
              Return to Home
            </Button>
          </Link>
          <Link href="/resources">
            <Button variant="outline" className="text-purple-700 border-purple-500 hover:bg-purple-100 font-bold py-2 px-4 rounded-full transition-all duration-300">
              Explore Resources
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

