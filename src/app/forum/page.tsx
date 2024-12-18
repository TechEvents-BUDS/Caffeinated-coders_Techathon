"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface ForumPost {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
}

const initialPosts: ForumPost[] = [
  { id: 1, title: "Early signs of autism", content: "What are some early signs of autism that I should look out for in my 2-year-old?", author: "ConcernedParent", date: "2023-06-01" },
  { id: 2, title: "Sensory-friendly activities", content: "Can anyone recommend some sensory-friendly activities for a 4-year-old with autism?", author: "AutismMom", date: "2023-06-02" },
  { id: 3, title: "School accommodations", content: "What kind of accommodations should I request for my autistic child starting kindergarten?", author: "NewToSchool", date: "2023-06-03" },
]

export default function Forum() {
  const [posts, setPosts] = useState<ForumPost[]>(initialPosts)
  const [newPost, setNewPost] = useState({ title: '', content: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const post: ForumPost = {
      id: posts.length + 1,
      title: newPost.title,
      content: newPost.content,
      author: "CurrentUser", // In a real app, this would be the logged-in user
      date: new Date().toISOString().split('T')[0]
    }
    setPosts([post, ...posts])
    setNewPost({ title: '', content: '' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-4">
      <Card className="w-full max-w-4xl mx-auto bg-white/80 backdrop-blur-sm shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-purple-700">Discussion Forum</CardTitle>
          <CardDescription className="text-lg text-blue-600">
            Share experiences and ask questions about autism
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Post Title"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              required
            />
            <Textarea
              placeholder="Post Content"
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              required
            />
            <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white">
              Submit Post
            </Button>
          </form>
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>{post.author} - {post.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{post.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
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
