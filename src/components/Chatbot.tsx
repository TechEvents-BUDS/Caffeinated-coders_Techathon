"use client"

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2, Send, MessageCircle, X } from 'lucide-react'

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "Hello! I'm here to help you with questions about autism. How can I assist you today?", sender: 'bot', timestamp: new Date() }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = { id: Date.now().toString(), text: input, sender: 'user', timestamp: new Date() }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('api/chat', {
        method: 'POST',
        headers: {

        "key": "Content-Type",
        "value":"application/json"

        },
        body: JSON.stringify({ message: input }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response from the chatbot')
      }

      const data = await response.json()
      const botMessage: Message = { 
        id: (Date.now() + 1).toString(), 
        text: data.response, 
        sender: 'bot', 
        timestamp: new Date() 
      }
      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, but I couldn't process your request. Please try again later.",
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const toggleChat = () => setIsChatOpen(!isChatOpen)

  return (
    <>
      {!isChatOpen && (
        <Button
          onClick={toggleChat}
          className="fixed bottom-4 right-4 rounded-full w-16 h-16 shadow-lg bg-purple-600 hover:bg-purple-700 text-white"
        >
          <MessageCircle size={24} />
        </Button>
      )}
      {isChatOpen && (
        <Card className="fixed bottom-4 right-4 w-96 h-[500px] shadow-xl flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold text-purple-700">Autism Support Chat</CardTitle>
            <Button variant="ghost" size="icon" onClick={toggleChat}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[350px] w-full pr-4" ref={scrollAreaRef}>
              {messages.map((message) => (
                <div key={message.id} className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {message.sender === 'bot' && (
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Bot" />
                      <AvatarFallback>Bot</AvatarFallback>
                    </Avatar>
                  )}
                  <div className={`max-w-[80%] p-3 rounded-lg ${message.sender === 'user' ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                    <p>{message.text}</p>
                    <span className="text-xs opacity-50 mt-1 block">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  {message.sender === 'user' && (
                    <Avatar className="h-8 w-8 ml-2">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                      <AvatarFallback>You</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start mb-4">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Bot" />
                    <AvatarFallback>Bot</AvatarFallback>
                  </Avatar>
                  <div className="bg-gray-200 p-3 rounded-lg">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                </div>
              )}
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <form onSubmit={handleSend} className="flex w-full space-x-2">
              <Input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-grow"
              />
              <Button type="submit" disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </>
  )
}

