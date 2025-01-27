import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, MapPin } from "lucide-react"
import { DecorativePattern } from "./DecorativePattern"
import Image from "next/image"

interface InvitationCardProps {
  name: string
  classStream: string
}

export default function InvitationCard({ name, classStream }: InvitationCardProps) {
  return (
    <Card className="w-[800px] h-[400px] bg-gradient-to-r from-[#1e3a8a] via-[#312e81] to-[#4c1d95] overflow-hidden shadow-xl border-0">
      <CardContent className="p-0 flex h-full relative">
        <DecorativePattern />

        {/* Left Section with School Logo and Details */}
        <div className="w-1/2 p-8 flex flex-col justify-between relative z-10 border-r border-white/10">
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 mb-4">
              <Image
                src="/logo.png"
                alt="UCSKM Public School Logo"
                fill
                className="object-contain"
              />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2 font-serif text-center">Vidāī Samārōh</h1>
            <p className="text-lg text-white/80 mt-2 mb-1">Class of 2025</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center text-white/90 bg-white/5 p-3 rounded-lg backdrop-blur-sm">
              <Calendar className="w-5 h-5 mr-3 text-yellow-300" />
              <p className="text-lg">31st January, 2025</p>
            </div>
            <div className="flex items-center text-white/90 bg-white/5 p-3 rounded-lg backdrop-blur-sm">
              <Clock className="w-5 h-5 mr-3 text-yellow-300" />
              <p className="text-lg">9:30 AM Onwards</p>
            </div>
            <div className="flex items-center text-white/90 bg-white/5 p-3 rounded-lg backdrop-blur-sm">
              <MapPin className="w-5 h-5 mr-3 text-yellow-300" />
              <p className="text-lg">School Auditorium</p>
            </div>
          </div>
        </div>

        {/* Right Section with Invitation Text */}
        <div className="w-1/2 flex flex-col justify-center items-center p-8 relative z-10">
          <div className="text-center space-y-6">
            <div>
              <p className="text-2xl font-semibold text-white mb-2">Respected</p>
              <p className="text-3xl font-bold text-yellow-300 mb-4">{name}</p>
            </div>

            <div className="space-y-2">
              <p className="text-xl text-white/90">We cordially invite you to the</p>
              <p className="text-2xl font-bold text-white">Farewell Celebration</p>
              <p className="text-xl text-white/90">of</p>
              <p className="text-3xl font-bold text-yellow-300 font-serif">{classStream}</p>
            </div>

            <div className="pt-4">
              <p className="text-lg text-white/80 italic">
                &quot;May your future shine as bright as the morning sun, illuminating paths of endless possibilities.&quot;
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

