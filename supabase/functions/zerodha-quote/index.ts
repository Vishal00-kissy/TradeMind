import { corsHeaders } from '../_shared/cors.ts';

interface QuoteRequest {
  instruments: string[]; // Array of exchange:tradingsymbol like "NSE:INFY", "NFO:NIFTY24JAN25000CE"
  accessToken: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { instruments, accessToken } = await req.json() as QuoteRequest;

    if (!instruments || instruments.length === 0) {
      throw new Error('No instruments specified');
    }

    if (!accessToken) {
      throw new Error('Access token required');
    }

    const apiKey = Deno.env.get('ZERODHA_API_KEY');
    
    // Get live quotes from Zerodha
    const instrumentsParam = instruments.join('&i=');
    const response = await fetch(
      `https://api.kite.trade/quote?i=${instrumentsParam}`,
      {
        headers: {
          'X-Kite-Version': '3',
          'Authorization': `token ${apiKey}:${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('Zerodha API error:', error);
      throw new Error(`Failed to fetch quotes: ${response.status}`);
    }

    const data = await response.json();

    return new Response(
      JSON.stringify({ quotes: data.data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Quote fetch error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Failed to fetch quotes' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
