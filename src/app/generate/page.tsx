"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { createShortUrl, getAllUrls, bulkCreateUrls } from "../actions"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function GeneratePage() {
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [urls, setUrls] = useState<Array<{ id: string; name: string; classStream: string; createdAt: Date }>>([])
  const [bulkData, setBulkData] = useState("")
  const { toast } = useToast()

  async function onSubmit(formData: FormData) {
    setIsLoading(true)
    try {
      const name = formData.get("name") as string
      const classStream = formData.get("classStream") as string

      if (!name || !classStream) {
        throw new Error("Please fill in all fields")
      }

      const id = await createShortUrl(name, classStream)
      const url = `${process.env.NEXT_PUBLIC_APP_URL}/greetings/${id}`
      setGeneratedUrl(url)
      toast({
        title: "URL Generated",
        description: "The short URL has been created successfully.",
      })
      fetchUrls()
    } catch (error) {
      console.error("Error generating URL:", error)
      toast({
        title: "Error",
        description: "An error occurred while generating the URL. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function fetchUrls() {
    try {
      const allUrls = await getAllUrls()
      setUrls(allUrls)
    } catch (error) {
      console.error("Error fetching URLs:", error)
      toast({
        title: "Error",
        description: "Failed to fetch URLs. Please try again.",
        variant: "destructive",
      })
    }
  }

  async function handleBulkCreate() {
    setIsLoading(true)
    try {
      const data = JSON.parse(bulkData)
      if (!Array.isArray(data)) {
        throw new Error("Invalid JSON format. Please provide an array of objects.")
      }
      await bulkCreateUrls(data)
      toast({
        title: "Bulk Creation Successful",
        description: `Created ${data.length} URLs successfully.`,
      })
      fetchUrls()
      setBulkData("")
    } catch (error) {
      console.error("Error in bulk creation:", error)
      toast({
        title: "Error",
        description: "An error occurred during bulk creation. Please check your JSON format and try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <Card className="p-6 backdrop-blur-xl bg-white/10">
          <h1 className="text-2xl font-bold text-white mb-6">Generate Greeting URL</h1>
          <form action={onSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-white">
                  Student Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter student name"
                  className="bg-white/20 text-white placeholder:text-white/50 border-white/20"
                  required
                />
              </div>
              <div>
                <Label htmlFor="classStream" className="text-white">
                  Class & Stream
                </Label>
                <Input
                  id="classStream"
                  name="classStream"
                  placeholder="e.g., 12th PCM"
                  className="bg-white/20 text-white placeholder:text-white/50 border-white/20"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-white text-purple-600 hover:bg-white/90" disabled={isLoading}>
                {isLoading ? "Generating..." : "Generate URL"}
              </Button>
            </div>
          </form>
          {generatedUrl && (
            <div className="mt-6 p-4 bg-white/20 rounded-md">
              <p className="text-white font-semibold mb-2">Generated URL:</p>
              <div className="flex items-center gap-2">
                <Input value={generatedUrl} readOnly className="bg-white/10 text-blue-200 border-white/20" />
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(generatedUrl)
                    toast({
                      title: "Copied!",
                      description: "URL copied to clipboard",
                    })
                  }}
                  className="bg-white/20 hover:bg-white/30 text-white"
                >
                  Copy
                </Button>
              </div>
            </div>
          )}
        </Card>

        <Card className="p-6 backdrop-blur-xl bg-white/10">
          <h2 className="text-2xl font-bold text-white mb-6">Bulk Create URLs</h2>
          <div className="space-y-4">
            <Textarea
              placeholder="Paste JSON data here..."
              value={bulkData}
              onChange={(e) => setBulkData(e.target.value)}
              className="bg-white/20 text-white placeholder:text-white/50 border-white/20 h-40"
            />
            <Button
              onClick={handleBulkCreate}
              className="w-full bg-white text-purple-600 hover:bg-white/90"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Bulk Create URLs"}
            </Button>
          </div>
        </Card>

        <Card className="p-6 backdrop-blur-xl bg-white/10">
          <h2 className="text-2xl font-bold text-white mb-6">All Generated URLs</h2>
          <div className="flex justify-between items-center mb-4">
            <Button onClick={fetchUrls} className="bg-white/20 hover:bg-white/30 text-white">
              Refresh List
            </Button>
            <Link href="/list" passHref>
              <Button className="bg-white text-purple-600 hover:bg-white/90">View Full List</Button>
            </Link>
          </div>
          <div className="space-y-4">
            {urls.map((url) => (
              <div key={url.id} className="p-4 bg-white/10 rounded-md">
                <p className="text-white font-semibold">
                  {url.name} - {url.classStream}
                </p>
                <p className="text-sm text-white/70">Created: {new Date(url.createdAt).toLocaleString()}</p>
                <a
                  href={`${process.env.NEXT_PUBLIC_APP_URL}/greetings/${url.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-200 hover:underline text-sm"
                >
                  View Greeting
                </a>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

