"use server"

import { generateImage } from "@/utils/generateImage"
import { sendWhatsAppMessage } from "@/utils/sendWhatsAppMessage"

const students = [
  { name: "John Doe", classStream: "12th PCM", phoneNumber: "+1234567890" },
  { name: "Jane Smith", classStream: "12th PCB", phoneNumber: "+0987654321" },
  // Add more students here...
]

export async function sendInvitations() {
  for (const student of students) {
    const image = await generateImage(student.name, student.classStream)
    const imageUrl = `data:image/png;base64,${image.toString("base64")}`

    await sendWhatsAppMessage({
      to: student.phoneNumber,
      body: `Dear ${student.name}, you're invited to the farewell celebration for ${student.classStream}. Join us on June 15, 2023, at 9:30 AM at UCSKM Public School, Bhiwadi.`,
      mediaUrl: imageUrl,
    })
  }

  return { message: "All invitations sent successfully!" }
}

