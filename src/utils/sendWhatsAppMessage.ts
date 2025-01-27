import axios from "axios"

interface WhatsAppMessage {
  to: string
  body: string
  mediaUrl: string
}

const wassangerApiKey = process.env.WASSENGER_API_KEY

export const sendWhatsAppMessage = async (message: WhatsAppMessage) => {
  try {
    const response = await axios.post(
      "https://api.wassenger.com/v1/messages",
      {
        phone: message.to,
        message: message.body,
        media: {
          url: message.mediaUrl,
          filename: "invitation.png",
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Token: wassangerApiKey,
        },
      },
    )

    if (response.status === 200) {
      console.log(`Message sent successfully to ${message.to}`)
    } else {
      throw new Error(`Failed to send message. Status: ${response.status}`)
    }
  } catch (error) {
    console.error(`Failed to send message to ${message.to}:`, error)
  }
}

