import { corsHeaders } from '../_shared/cors.ts';

interface OrderRequest {
  tradingSymbol: string;
  exchange: string; // NSE, NFO, BSE, etc.
  transactionType: 'BUY' | 'SELL';
  quantity: number;
  orderType: 'MARKET' | 'LIMIT' | 'SL' | 'SL-M';
  price?: number;
  triggerPrice?: number;
  product: 'MIS' | 'CNC' | 'NRML'; // Intraday, Delivery, Normal
  validity?: 'DAY' | 'IOC';
  accessToken: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const orderRequest = await req.json() as OrderRequest;

    if (!orderRequest.accessToken) {
      throw new Error('Access token required');
    }

    const apiKey = Deno.env.get('ZERODHA_API_KEY');
    
    // Prepare order parameters
    const orderParams: any = {
      tradingsymbol: orderRequest.tradingSymbol,
      exchange: orderRequest.exchange,
      transaction_type: orderRequest.transactionType,
      quantity: orderRequest.quantity,
      order_type: orderRequest.orderType,
      product: orderRequest.product,
      validity: orderRequest.validity || 'DAY',
    };

    if (orderRequest.orderType === 'LIMIT' && orderRequest.price) {
      orderParams.price = orderRequest.price;
    }

    if ((orderRequest.orderType === 'SL' || orderRequest.orderType === 'SL-M') && orderRequest.triggerPrice) {
      orderParams.trigger_price = orderRequest.triggerPrice;
      if (orderRequest.orderType === 'SL' && orderRequest.price) {
        orderParams.price = orderRequest.price;
      }
    }

    // Place order via Zerodha API
    const response = await fetch('https://api.kite.trade/orders/regular', {
      method: 'POST',
      headers: {
        'X-Kite-Version': '3',
        'Authorization': `token ${apiKey}:${orderRequest.accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(orderParams),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Order placement error:', error);
      throw new Error(error.message || 'Order placement failed');
    }

    const data = await response.json();

    return new Response(
      JSON.stringify({
        success: true,
        orderId: data.data.order_id,
        message: 'Order placed successfully',
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Order error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Order failed' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
