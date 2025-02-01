"use client"

import { useEffect, useState } from "react"
import { getAllUrlsSortedBySection } from "@/app/actions"
import { SortableSection } from "@/components/SortableSection"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, ChevronUp, ChevronDown } from "lucide-react"

interface SortedUrls {
  [section: string]: Array<{
    id: string
    name: string
    classStream: string
    url: string
  }>
}

export default function ListPage() {
  const [sortedUrls, setSortedUrls] = useState<SortedUrls>({})
  const [sectionOrder, setSectionOrder] = useState<"asc" | "desc">("asc")

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllUrlsSortedBySection()
      setSortedUrls(data)
    }
    fetchData()
  }, [])

  const sortSections = () => {
    const sortedSections = Object.entries(sortedUrls).sort(([a], [b]) => {
      return sectionOrder === "asc" ? a.localeCompare(b) : b.localeCompare(a)
    })
    setSortedUrls(Object.fromEntries(sortedSections))
    setSectionOrder(sectionOrder === "asc" ? "desc" : "asc")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <Link href="/generate" passHref>
            <Button variant="ghost" className="text-white hover:bg-white/10">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Generate
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-center text-white">Farewell Greetings List</h1>
          <Button variant="ghost" className="text-white hover:bg-white/10" onClick={sortSections}>
            Sort Sections{" "}
            {sectionOrder === "asc" ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
          </Button>
        </div>

        {Object.entries(sortedUrls).map(([section, students]) => (
          <SortableSection key={section} section={section} students={students} />
        ))}
      </div>
    </div>
  )
}

