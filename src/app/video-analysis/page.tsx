import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function VideoAnalysis() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white/80 backdrop-blur-sm shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-purple-700">Video Analysis Results</CardTitle>
          <CardDescription className="text-lg text-blue-600">
            Based on our AI-powered analysis of the uploaded video
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">
            Our analysis has identified some potential indicators that may warrant further professional evaluation:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Limited eye contact during interactions</li>
            <li>Reduced responsive smiling</li>
            <li>Lack of pointing to show interest</li>
            <li>Limited engagement in imaginative play</li>
          </ul>
          <div className="bg-yellow-100 p-4 rounded-lg mt-4">
            <p className="text-gray-700 font-bold">Important Note:</p>
            <p className="text-gray-600">
              This analysis is not a diagnosis. It's designed to help identify potential signs that may indicate a need for further evaluation by healthcare professionals.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/video-upload">
            <Button variant="outline" className="text-purple-700 border-purple-500 hover:bg-purple-100">
              Upload Another Video
            </Button>
          </Link>
          <Link href="/">
            <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white">
              Back to Home
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

