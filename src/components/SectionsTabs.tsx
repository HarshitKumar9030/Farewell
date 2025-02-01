"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ChevronUp, ChevronDown, Copy, Check } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface Student {
  id: string
  name: string
  classStream: string
  url: string
}

interface SectionTabsProps {
  sections: Record<string, Student[]>
}

export function SectionTabs({ sections }: SectionTabsProps) {
  const [sortOrders, setSortOrders] = useState<Record<string, "asc" | "desc">>({})
  const [sortedSections, setSortedSections] = useState<Record<string, Student[]>>(sections)
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({})
  const { toast } = useToast()

  const sortStudents = (sectionKey: string) => {
    const currentOrder = sortOrders[sectionKey] || "asc"
    const newOrder = currentOrder === "asc" ? "desc" : "asc"

    const sorted = [...sortedSections[sectionKey]].sort((a, b) => {
      return currentOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    })

    setSortOrders({ ...sortOrders, [sectionKey]: newOrder })
    setSortedSections({ ...sortedSections, [sectionKey]: sorted })
  }

  const copyToClipboard = async (url: string, studentId: string) => {
    try {
      await navigator.clipboard.writeText(url)
      setCopiedStates({ ...copiedStates, [studentId]: true })
      toast({
        title: "URL Copied",
        description: "The greeting URL has been copied to your clipboard.",
      })
      setTimeout(() => {
        setCopiedStates({ ...copiedStates, [studentId]: false })
      }, 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
      toast({
        title: "Copy Failed",
        description: "Failed to copy the URL. Please try again.",
        variant: "destructive",
      })
    }
  }

  const sectionKeys = Object.keys(sections).sort()
  const defaultSection = sectionKeys[0]

  return (
    <Tabs defaultValue={defaultSection} className="w-full">
      <TabsList
        className="grid w-full bg-white/10"
        style={{
          gridTemplateColumns: `repeat(${sectionKeys.length}, minmax(0, 1fr))`,
        }}
      >
        {sectionKeys.map((section) => (
          <TabsTrigger
            key={section}
            value={section}
            className="data-[state=active]:bg-white/20 text-white whitespace-nowrap px-4"
          >
            {section}
          </TabsTrigger>
        ))}
      </TabsList>

      {sectionKeys.map((sectionKey) => (
        <TabsContent key={sectionKey} value={sectionKey}>
          <Card className="backdrop-blur-xl bg-white/10 border-white/20">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">{sectionKey}</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10"
                  onClick={() => sortStudents(sectionKey)}
                >
                  Sort by Name{" "}
                  {sortOrders[sectionKey] === "desc" ? (
                    <ChevronDown className="ml-2 h-4 w-4" />
                  ) : (
                    <ChevronUp className="ml-2 h-4 w-4" />
                  )}
                </Button>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-white">Name</TableHead>
                      <TableHead className="text-white">Class & Stream</TableHead>
                      <TableHead className="text-white">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedSections[sectionKey].map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="text-white font-medium">{student.name}</TableCell>
                        <TableCell className="text-white">{student.classStream}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Link
                              href={student.url}
                              className="text-blue-200 hover:text-blue-100 underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View
                            </Link>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-white hover:bg-white/10"
                              onClick={() => copyToClipboard(student.url, student.id)}
                            >
                              {copiedStates[student.id] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                              <span className="sr-only">Copy URL</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  )
}

