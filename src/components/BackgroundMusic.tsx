"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX } from "lucide-react"

export function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <audio ref={audioRef} loop>
        <source src="/farewell-music.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <Button
        variant="outline"
        size="icon"
        onClick={togglePlay}
        className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20"
      >
        {isPlaying ? <Volume2 className="h-4 w-4 text-white" /> : <VolumeX className="h-4 w-4 text-white" />}
        <span className="sr-only">{isPlaying ? "Pause" : "Play"} background music</span>
      </Button>
    </div>
  )
}

