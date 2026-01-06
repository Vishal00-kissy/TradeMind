import { corsHeaders } from '../_shared/cors.ts';
import { createClient } from 'jsr:@supabase/supabase-js@2';

interface LoginRequest {
  requestToken?: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('ZERODHA_API_KEY');
    const apiSecret = Deno.env.get('ZERODHA_API_SECRET');

    if (!apiKey || !apiSecret) {
      throw new Error('Zerodha credentials not configured');
    }

    const { requestToken } = await req.json() as LoginRequest;

    if (!requestToken) {
      // Return login URL for user to authenticate
      const loginUrl = `https://kite.zerodha.com/connect/login?api_key=${apiKey}`;
      return new Response(
        JSON.stringify({ loginUrl, message: 'Please authenticate via Zerodha' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Exchange request token for access token
    const checksum = await generateChecksum(apiKey, requestToken, apiSecret);
    
    const response = await fetch('https://api.kite.trade/session/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        api_key: apiKey,
        request_token: requestToken,
        checksum: checksum,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Zerodha auth failed: ${error}`);
    }

    const data = await response.json();
    
    // Store access token in user's profile (encrypted)
    const authHeader = req.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { data: { user } } = await supabase.auth.getUser(token);
    
    if (user) {
      // Store access token securely (in production, encrypt this)
      await supabase
        .from('user_profiles')
        .update({ 
          username: data.data.user_name,
          // Store in a separate secure table in production
        })
        .eq('id', user.id);
    }

    return new Response(
      JSON.stringify({
        success: true,
        accessToken: data.data.access_token,
        userName: data.data.user_name,
        userEmail: data.data.email,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Zerodha login error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Login failed' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function generateChecksum(apiKey: string, requestToken: string, apiSecret: string): Promise<string> {
  const data = `${apiKey}${requestToken}${apiSecret}`;
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
