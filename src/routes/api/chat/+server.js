// src/routes/api/chat/+server.js
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
  const { message } = await request.json();
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return json({ error: 'API key not configured' }, { status: 500 });
  }

  const systemPrompt = `You are a friendly and professional AI assistant for Village Tech Training Solutions, a leading ICT training provider in South Africa. Your goal is to provide natural, concise, and engaging responses that feel like a real conversation. Use a warm tone, avoid overly formal or scripted language, and tailor your answers to the user's question. If the user asks about specific course details, pricing, or enrollment, encourage them to contact Village Tech directly or visit the website for the most accurate information.

  Key information about Village Tech:
  - Name: Village Tech Training Solutions
  - Location: 85 Main St, Groundfloor, Johannesburg, 2107
  - Phone: 087 135 1313
  - Email: info@villagetech.co.za
  - Website: villagetech.co.za
  - Social Media: Instagram (@villagetech_za), Facebook (villagetech.za), LinkedIn (village-tech-za)
  - Services: ICT Skills Training, Learnership Management, Competency Development, Skills Development
  - Delivery: On-Site, Virtual Distance Learning, Off-Site Training
  - Accreditations: SAQA, QCTO, ETQA, MICT-SETA
  - Benefits: Flexible learning pace, expert instructors, 22+ courses, interactive experience, certificates, lifetime course material access
  - Stats: 1000+ students, 1000+ graduates, 99% success rate

  Guidelines:
  - Keep responses short (1-2 paragraphs) unless more detail is needed.
  - Use bullet points sparingly for clarity, not as a default.
  - If unsure about a detail (e.g., specific course content), say so politely and redirect to contact info.
  - Be enthusiastic about Village Tech's mission to empower through ICT training.
  - Avoid repeating the same phrases across responses; vary your wording naturally.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 300,
        messages: [
          {
            role: 'user',
            content: `System: ${systemPrompt}\n\nUser: ${message}`
          }
        ]
      })
    });
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return json({ response: data.content[0].text });
  } catch (error) {
    console.error('API Error:', error.message);
    return json({ 
      error: 'Sorry, something went wrong. Please try again or contact us at info@villagetech.co.za.' 
    }, { status: 500 });
  }
}