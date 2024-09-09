import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req) {
  const { message } = await req.json();

  if (!message) {
    return new Response(JSON.stringify({ error: "No message provided" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // Configurar el cliente de Gemini AI
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generar la respuesta usando el modelo de Gemini
    const result = await model.generateContent(message);

    return new Response(JSON.stringify({ reply: result.response.text() }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return new Response(JSON.stringify({ error: "Failed to get a response from Gemini" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
