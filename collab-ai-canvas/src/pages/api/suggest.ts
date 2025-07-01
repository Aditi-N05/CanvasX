import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { text } = req.body;
  const HF_API_KEY = process.env.HF_API_KEY;

  try {
    const response = await fetch('https://api-inference.huggingface.co/models/MBZUAI/LaMini-Flan-T5-783M', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: `Reword this marketing headline to be more engaging: "${text}"`,
      }),
    });

    const raw = await response.text();
    console.log("HF raw response:", raw);

    const data = JSON.parse(raw);

    const suggestion = Array.isArray(data)
      ? data[0]?.generated_text?.trim()
      : null;

    if (suggestion) {
      res.status(200).json({ suggestion });
    } else {
      console.error("Invalid response:", data);
      res.status(500).json({ suggestion: "", error: "Invalid response from model" });
    }
  } catch (err: any) {
    console.error("Hugging Face API Error:", err);
    res.status(500).json({ suggestion: "", error: err.message || "Unknown error" });
  }
}
