import puppeteer from "puppeteer"

export const generateImage = async (name: string, classStream: string): Promise<Buffer> => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  const html = `
    <html>
      <head>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;600;700&display=swap');
          body { 
            font-family: 'Inter', sans-serif; 
            margin: 0; 
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: linear-gradient(to right, #1e3a8a, #312e81, #4c1d95);
          }
          .card {
            width: 800px;
            height: 400px;
            background: linear-gradient(to right, #1e3a8a, #312e81, #4c1d95);
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            display: flex;
            position: relative;
            overflow: hidden;
          }
          .left, .right { 
            width: 50%; 
            padding: 32px;
            position: relative;
            z-index: 1;
          }
          .left {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            border-right: 1px solid rgba(255, 255, 255, 0.1);
          }
          .right {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          .logo-container {
            text-align: center;
            margin-bottom: 24px;
          }
          .logo {
            width: 128px;
            height: 128px;
            margin-bottom: 16px;
          }
          .title {
            font-family: 'Playfair Display', serif;
            font-size: 36px;
            color: white;
            margin: 0;
            text-align: center;
          }
          .subtitle {
            font-size: 20px;
            color: rgba(255, 255, 255, 0.9);
            margin: 4px 0;
            text-align: center;
          }
          .details {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }
          .detail-item {
            display: flex;
            align-items: center;
            background: rgba(255, 255, 255, 0.05);
            padding: 12px;
            border-radius: 8px;
            color: rgba(255, 255, 255, 0.9);
          }
          .detail-item svg {
            width: 20px;
            height: 20px;
            margin-right: 12px;
            color: #FDE68A;
          }
          .name {
            font-size: 28px;
            color: #FDE68A;
            font-weight: bold;
            margin-bottom: 16px;
          }
          .invite-text {
            text-align: center;
            color: rgba(255, 255, 255, 0.9);
            font-size: 20px;
            margin-bottom: 8px;
          }
          .stream {
            font-family: 'Playfair Display', serif;
            font-size: 28px;
            color: #FDE68A;
            margin: 16px 0;
            font-weight: bold;
          }
          .quote {
            font-size: 16px;
            font-style: italic;
            color: rgba(255, 255, 255, 0.8);
            text-align: center;
            max-width: 80%;
            margin-top: 24px;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="left">
            <div class="logo-container">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-MpkBr0gLGQ3VcP7ow2DLA9HNKRyAwE.png" alt="UCSKM Public School Logo" class="logo">
              <h1 class="title">Vidāī Samārōh</h1>
              <p class="subtitle">(Farewell Ceremony)</p>
              <p class="subtitle">Class of 2025</p>
            </div>
            <div class="details">
              <div class="detail-item">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                31st January, 2025
              </div>
              <div class="detail-item">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                9:30 AM Onwards
              </div>
              <div class="detail-item">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                School Auditorium
              </div>
            </div>
          </div>
          <div class="right">
            <p class="invite-text">Respected</p>
            <p class="name">${name}</p>
            <p class="invite-text">We cordially invite you to the</p>
            <p class="invite-text" style="font-weight: bold; font-size: 24px;">Farewell Celebration</p>
            <p class="invite-text">of</p>
            <p class="stream">${classStream}</p>
            <p class="quote">"May your future shine as bright as the morning sun, illuminating paths of endless possibilities."</p>
          </div>
        </div>
      </body>
    </html>
  `

  await page.setContent(html)
  await page.setViewport({ width: 900, height: 500 })
  const element = await page.$(".card")
  if (!element) throw new Error("Card element not found")
  const image = await element.screenshot({ omitBackground: true })
  await browser.close()

  return Buffer.from(image)
}

