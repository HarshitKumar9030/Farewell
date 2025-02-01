"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ChevronUp, ChevronDown } from "lucide-react"
import Link from "next/link"

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

  const sortStudents = (sectionKey: string, students: Student[]) => {
    const currentOrder = sortOrders[sectionKey] || "asc"
    const newOrder = currentOrder === "asc" ? "desc" : "asc"

    const sorted = [...students].sort((a, b) => {
      return currentOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    })

    setSortOrders({ ...sortOrders, [sectionKey]: newOrder })
    return sorted
  }

  const sectionKeys = Object.keys(sections)
  const defaultSection = sectionKeys[0]

  return (
    <Tabs defaultValue={defaultSection} className="w-full">
      <TabsList className="grid grid-cols-3 w-full bg-white/10">
        {sectionKeys.map((section) => (
          <TabsTrigger key={section} value={section} className="data-[state=active]:bg-white/20 text-white">
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
                  onClick={() => sortStudents(sectionKey, sections[sectionKey])}
                >
                  Sort by Name{" "}
                  {sortOrders[sectionKey] === "desc" ? (
                    <ChevronDown className="ml-2 h-4 w-4" />
                  ) : (
                    <ChevronUp className="ml-2 h-4 w-4" />
                  )}
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-white">Name</TableHead>
                    <TableHead className="text-white">Class & Stream</TableHead>
                    <TableHead className="text-white">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sections[sectionKey].map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="text-white font-medium">{student.name}</TableCell>
                      <TableCell className="text-white">{student.classStream}</TableCell>
                      <TableCell>
                        <Link
                          href={student.url}
                          className="text-blue-200 hover:text-blue-100 underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Greeting
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  )
}

