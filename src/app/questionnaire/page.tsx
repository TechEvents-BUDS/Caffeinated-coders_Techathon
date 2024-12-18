"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"

const questions = [
  {
    question: "Does your child make eye contact when you're talking to them?",
    description: "Observe if your child looks at you when you speak to them or call their name.",
  },
  {
    question: "Does your child respond to their name when called?",
    description: "Notice if your child turns towards you or acknowledges when you call their name.",
  },
  {
    question: "Does your child point at objects to show interest?",
    description: "Look for instances where your child uses their index finger to point at things they find interesting.",
  },
  {
    question: "Does your child engage in pretend play?",
    description: "Observe if your child uses toys or objects in imaginative ways, like pretending a banana is a phone.",
  },
  {
    question: "Does your child show interest in other children?",
    description: "Notice if your child tries to interact with or shows curiosity about other children.",
  },
]

export default function Questionnaire() {
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const router = useRouter()

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value })
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      const score = Object.values(answers).filter(answer => answer === 'no').length
      router.push(`/results?score=${score}`)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white/80 backdrop-blur-sm shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-purple-700">Question {currentQuestion + 1} of {questions.length}</CardTitle>
          <CardDescription className="text-lg text-blue-600">{questions[currentQuestion].question}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-gray-600 italic">{questions[currentQuestion].description}</p>
          <RadioGroup onValueChange={handleAnswer} value={answers[currentQuestion]} className="space-y-4">
            <div className="flex items-center space-x-2 p-3 bg-green-100 rounded-lg transition-all duration-300 hover:bg-green-200">
              <RadioGroupItem value="yes" id="yes" />
              <Label htmlFor="yes" className="text-lg cursor-pointer flex-grow">Yes</Label>
            </div>
            <div className="flex items-center space-x-2 p-3 bg-red-100 rounded-lg transition-all duration-300 hover:bg-red-200">
              <RadioGroupItem value="no" id="no" />
              <Label htmlFor="no" className="text-lg cursor-pointer flex-grow">No</Label>
            </div>
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-4">
          <div className="flex justify-between w-full">
            <Button 
              onClick={handlePrevious} 
              disabled={currentQuestion === 0}
              className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full transition-all duration-300 hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </Button>
            <Button 
              onClick={handleNext} 
              disabled={!answers[currentQuestion]}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentQuestion < questions.length - 1 ? 'Next' : 'See Results'}
            </Button>
          </div>
          <Progress value={progress} className="w-full" />
        </CardFooter>
      </Card>
    </div>
  )
}

