import { corsHeaders } from '../_shared/cors.ts';

interface CryptoAnalysisRequest {
  symbol: string;
  name: string;
  currentPrice: number;
  change24h: number;
  changePercent24h: number;
  marketCap: string;
  volume24h: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { symbol, name, currentPrice, change24h, changePercent24h, marketCap, volume24h }: CryptoAnalysisRequest = await req.json();

    const baseUrl = Deno.env.get('ONSPACE_AI_BASE_URL');
    const apiKey = Deno.env.get('ONSPACE_AI_API_KEY');

    if (!baseUrl || !apiKey) {
      throw new Error('AI service not configured');
    }

    const prompt = `As a professional cryptocurrency trading advisor, analyze ${name} (${symbol}) and provide actionable trading signals.

Current Market Data:
- Price: ₹${currentPrice.toLocaleString('en-IN')}
- 24h Change: ${changePercent24h >= 0 ? '+' : ''}${changePercent24h.toFixed(2)}% (₹${change24h.toLocaleString('en-IN')})
- Market Cap: ${marketCap}
- 24h Volume: ${volume24h}

Provide:
1. Signal: BUY, SELL, or HOLD
2. Confidence: Percentage (0-100%)
3. Target Price: Expected price target in next 24-48 hours
4. Stop Loss: Recommended stop loss price
5. Reasoning: Brief explanation (max 2 sentences)
6. Risk Level: LOW, MEDIUM, or HIGH
7. Time Horizon: SHORT_TERM (24-48h), MEDIUM_TERM (1 week), or LONG_TERM (1 month+)

Format response as JSON:
{
  "signal": "BUY|SELL|HOLD",
  "confidence": number,
  "targetPrice": number,
  "stopLoss": number,
  "reasoning": "string",
  "riskLevel": "LOW|MEDIUM|HIGH",
  "timeHorizon": "SHORT_TERM|MEDIUM_TERM|LONG_TERM",
  "potentialProfit": number (percentage)
}`;

    console.log('Calling OnSpace AI for crypto analysis:', symbol);

    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages: [
          {
            role: 'system',
            content: 'You are an expert cryptocurrency trading advisor. Always respond with valid JSON only, no additional text.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI API error:', errorText);
      throw new Error(`AI service error: ${response.status}`);
    }

    const data = await response.json();
    console.log('AI response received');

    let aiResponse = data.choices[0].message.content;
    
    // Extract JSON from markdown code blocks if present
    if (aiResponse.includes('```json')) {
      aiResponse = aiResponse.split('```json')[1].split('```')[0].trim();
    } else if (aiResponse.includes('```')) {
      aiResponse = aiResponse.split('```')[1].split('```')[0].trim();
    }

    const analysis = JSON.parse(aiResponse);

    return new Response(
      JSON.stringify({
        symbol,
        analysis,
        timestamp: new Date().toISOString(),
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Crypto analysis error:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Analysis failed' 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
