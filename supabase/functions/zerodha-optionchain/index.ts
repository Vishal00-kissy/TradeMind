import { corsHeaders } from '../_shared/cors.ts';

interface OptionChainRequest {
  symbol: string; // e.g., "NIFTY", "BANKNIFTY"
  expiry: string; // e.g., "2025-01-30"
  accessToken: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { symbol, expiry, accessToken } = await req.json() as OptionChainRequest;

    if (!accessToken) {
      throw new Error('Access token required');
    }

    const apiKey = Deno.env.get('ZERODHA_API_KEY');
    
    // Fetch instruments for the symbol
    const instrumentsResponse = await fetch(
      'https://api.kite.trade/instruments/NFO',
      {
        headers: {
          'X-Kite-Version': '3',
          'Authorization': `token ${apiKey}:${accessToken}`,
        },
      }
    );

    if (!instrumentsResponse.ok) {
      throw new Error('Failed to fetch instruments');
    }

    const instrumentsText = await instrumentsResponse.text();
    const lines = instrumentsText.split('\n');
    const headers = lines[0].split(',');
    
    // Parse CSV and filter for the symbol and expiry
    const options: any[] = [];
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',');
      if (values.length < headers.length) continue;
      
      const instrument: any = {};
      headers.forEach((header, index) => {
        instrument[header] = values[index];
      });
      
      // Filter for matching symbol and expiry
      if (
        instrument.name === symbol &&
        instrument.expiry === expiry &&
        (instrument.instrument_type === 'CE' || instrument.instrument_type === 'PE')
      ) {
        options.push({
          tradingSymbol: instrument.tradingsymbol,
          strike: parseFloat(instrument.strike),
          type: instrument.instrument_type,
          exchange: 'NFO',
        });
      }
    }

    // Get live quotes for all options
    if (options.length > 0) {
      const instruments = options.map(opt => `NFO:${opt.tradingSymbol}`);
      const quotesResponse = await fetch(
        `https://api.kite.trade/quote?i=${instruments.join('&i=')}`,
        {
          headers: {
            'X-Kite-Version': '3',
            'Authorization': `token ${apiKey}:${accessToken}`,
          },
        }
      );

      if (quotesResponse.ok) {
        const quotesData = await quotesResponse.json();
        
        // Merge quotes with options
        options.forEach(opt => {
          const quoteKey = `NFO:${opt.tradingSymbol}`;
          if (quotesData.data[quoteKey]) {
            opt.ltp = quotesData.data[quoteKey].last_price;
            opt.change = quotesData.data[quoteKey].change;
            opt.volume = quotesData.data[quoteKey].volume;
            opt.oi = quotesData.data[quoteKey].oi;
          }
        });
      }
    }

    return new Response(
      JSON.stringify({ options }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Option chain error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Failed to fetch option chain' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
