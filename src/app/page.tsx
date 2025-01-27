import InvitationCard from "@/components/InvitationCard"
import { Button } from "@/components/ui/button"
import { sendInvitations } from "@/app/actions"

const students = [
  { name: "John Doe", classStream: "12th PCM", phoneNumber: "+1234567890" },
  { name: "Jane Smith", classStream: "12th PCB", phoneNumber: "+0987654321" },
  { name: "Aarav Kumar", classStream: "12th PCM", phoneNumber: "+919876543210" },
  { name: "Priya Sharma", classStream: "12th PCB", phoneNumber: "+919876543211" },
  { name: "Rohan Singh", classStream: "12th PCM", phoneNumber: "+919876543212" },
  { name: "Neha Patel", classStream: "12th PCB", phoneNumber: "+919876543213" },
  { name: "Vikram Gupta", classStream: "12th PCM", phoneNumber: "+919876543214" },
  { name: "Anjali Reddy", classStream: "12th PCB", phoneNumber: "+919876543215" },
  { name: "Rajesh Khanna", classStream: "12th PCM", phoneNumber: "+919876543216" },
  { name: "Meera Desai", classStream: "12th PCB", phoneNumber: "+919876543217" },
  { name: "Sanjay Verma", classStream: "12th PCM", phoneNumber: "+919876543218" },
  { name: "Kavita Joshi", classStream: "12th PCB", phoneNumber: "+919876543219" },
  { name: "Arjun Mehta", classStream: "12th PCM", phoneNumber: "+919876543220" },
  { name: "Pooja Iyer", classStream: "12th PCB", phoneNumber: "+919876543221" },
  { name: "Rahul Mishra", classStream: "12th PCM", phoneNumber: "+919876543222" },
  { name: "Sunita Rao", classStream: "12th PCB", phoneNumber: "+919876543223" },
  { name: "Deepak Srinivasan", classStream: "12th PCM", phoneNumber: "+919876543224" },
  { name: "Shreya Choudhury", classStream: "12th PCB", phoneNumber: "+919876543225" },
  { name: "Karan Malhotra", classStream: "12th PCM", phoneNumber: "+919876543226" },
  { name: "Nisha Agarwal", classStream: "12th PCB", phoneNumber: "+919876543227" },
  { name: "Amit Trivedi", classStream: "12th PCM", phoneNumber: "+919876543228" },
  { name: "Divya Bhatia", classStream: "12th PCB", phoneNumber: "+919876543229" }
];

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

