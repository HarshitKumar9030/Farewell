import InvitationCard from "@/components/InvitationCard"
import { Button } from "@/components/ui/button"
import { sendInvitations } from "@/app/actions"

const students = [
  { name: "John Doe", classStream: "12th PCM", phoneNumber: "+1234567890" },
  { name: "Jane Smith", classStream: "12th PCB", phoneNumber: "+0987654321" },
  // Add more students here...
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">Farewell Invitations</h1>
        <div className="flex flex-col items-center gap-8">
          {students.map((student, index) => (
            <InvitationCard key={index} name={student.name} classStream={student.classStream} />
          ))}
        </div>
        <div className="mt-12 text-center space-y-4">
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <form action={sendInvitations}>
            <Button type="submit" className="w-64">
              Send Invitations via WhatsApp
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

