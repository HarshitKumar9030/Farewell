"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
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

interface SortableSectionProps {
  section: string
  students: Student[]
}

type SortField = "name" | "classStream"

export function SortableSection({ section, students: initialStudents }: SortableSectionProps) {
  const [students, setStudents] = useState(initialStudents)
  const [sortField, setSortField] = useState<SortField>("name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

  const sortStudents = (field: SortField) => {
    const sorted = [...students].sort((a, b) => {
      if (sortOrder === "asc") {
        return a[field].localeCompare(b[field])
      } else {
        return b[field].localeCompare(a[field])
      }
    })
    setStudents(sorted)
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortOrder("asc")
    }
  }

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null
    return sortOrder === "asc" ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />
  }

  return (
    <Card className="backdrop-blur-xl bg-white/10 border-white/20">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white">{section}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-white">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10"
                  onClick={() => sortStudents("name")}
                >
                  Name <SortIcon field="name" />
                </Button>
              </TableHead>
              <TableHead className="text-white">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10"
                  onClick={() => sortStudents("classStream")}
                >
                  Class & Stream <SortIcon field="classStream" />
                </Button>
              </TableHead>
              <TableHead className="text-white">Greeting URL</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="text-white">{student.name}</TableCell>
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
      </CardContent>
    </Card>
  )
}

