"use client"

import { useEffect, useState } from "react"
import { getAllUrlsSortedBySection } from "@/app/actions"
import { SectionTabs } from "@/components/SectionsTabs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface Student {
  id: string
  name: string
  classStream: string
  url: string
}

interface SortedUrls {
  [section: string]: Student[]
}

export default function ListPage() {
  const [sortedUrls, setSortedUrls] = useState<SortedUrls>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllUrlsSortedBySection()
        setSortedUrls(data)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-12 px-4 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center mb-8">
          <Link href="/generate" passHref>
            <Button variant="ghost" className="text-white hover:bg-white/10">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Generate
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-center text-white">Farewell Greetings List</h1>
          <div className="w-[100px]" /> {/* Spacer for alignment */}
        </div>

        {Object.keys(sortedUrls).length > 0 ? (
          <SectionTabs sections={sortedUrls} />
        ) : (
          <div className="text-center text-white text-xl">No greetings found. Start by generating some greetings!</div>
        )}
      </div>
    </div>
  )
}

