"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function DesktopModePopup() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsVisible(window.innerWidth < 768) // Show for screens smaller than 768px
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4 md:hidden">
      <Card className="bg-purple-600 text-white p-4 rounded-lg shadow-lg">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">For the best experience</h3>
            <p className="text-sm mb-4">
              Please switch to desktop mode in your browser settings for an optimal viewing experience.
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-purple-700"
            onClick={() => setIsVisible(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
        <Button
          variant="secondary"
          className="w-full bg-white text-purple-600 hover:bg-purple-100"
          onClick={() => setIsVisible(false)}
        >
          Got it
        </Button>
      </Card>
    </div>
  )
}

