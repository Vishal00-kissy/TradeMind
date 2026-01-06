import { corsHeaders } from '../_shared/cors.ts';

interface PortfolioRequest {
  accessToken: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { accessToken } = await req.json() as PortfolioRequest;

    if (!accessToken) {
      throw new Error('Access token required');
    }

    const apiKey = Deno.env.get('ZERODHA_API_KEY');
    
    // Fetch holdings
    const holdingsResponse = await fetch('https://api.kite.trade/portfolio/holdings', {
      headers: {
        'X-Kite-Version': '3',
        'Authorization': `token ${apiKey}:${accessToken}`,
      },
    });

    // Fetch positions
    const positionsResponse = await fetch('https://api.kite.trade/portfolio/positions', {
      headers: {
        'X-Kite-Version': '3',
        'Authorization': `token ${apiKey}:${accessToken}`,
      },
    });

    if (!holdingsResponse.ok || !positionsResponse.ok) {
      throw new Error('Failed to fetch portfolio data');
    }

    const holdings = await holdingsResponse.json();
    const positions = await positionsResponse.json();

    return new Response(
      JSON.stringify({
        holdings: holdings.data,
        positions: positions.data,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Portfolio fetch error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Failed to fetch portfolio' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
