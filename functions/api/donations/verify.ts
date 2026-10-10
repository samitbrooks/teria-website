// functions/api/donations/verify.ts
// Cloudflare Pages Function to verify and record Paystack donations

export const onRequestPost = async (context: any) => {
  try {
    const body = await context.request.json();
    const reference = body.reference;

    if (!reference) {
      return Response.json({ success: false, message: 'Missing transaction reference' }, { status: 400 });
    }

    // 1. Get secret key from D1 settings
    let secretKey = '';
    try {
      const row = await context.env.DB.prepare('SELECT value FROM settings WHERE key = ? LIMIT 1')
        .bind('site')
        .first();

      if (row && row.value) {
        const parsed = JSON.parse(row.value);
        secretKey = parsed.paystackSecretKey || '';
      }
    } catch (e) {
      console.warn('Could not read settings from DB:', e);
    }

    if (!secretKey && context.env.PAYSTACK_SECRET_KEY) {
      secretKey = context.env.PAYSTACK_SECRET_KEY;
    }

    let donorName = body.name || 'Anonymous';
    let donorEmail = body.email || '';
    let amount = Number(body.amount || 0);
    let currency = 'KES';
    let status = 'success';

    // 2. If secret key is available, verify with Paystack API
    if (secretKey) {
      try {
        const verifyRes = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${secretKey}`,
          },
        });

        if (verifyRes.ok) {
          const verifyData = await verifyRes.json();
          if (verifyData.status && verifyData.data) {
            status = verifyData.data.status === 'success' ? 'success' : verifyData.data.status;
            currency = verifyData.data.currency || 'KES';
            // Paystack returns amount in subunit (cents/kobo)
            amount = Math.round((verifyData.data.amount || 0) / 100);
            donorEmail = verifyData.data.customer?.email || donorEmail;
            donorName = verifyData.data.metadata?.name || donorName;
          }
        }
      } catch (paystackErr) {
        console.warn('Paystack API verification error:', paystackErr);
      }
    }

    // 3. Record in D1 donations table
    const id = `don-${Date.now()}`;
    await context.env.DB.prepare(
      `INSERT INTO donations (id, donor_name, donor_email, amount, currency, status, reference)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(id, donorName, donorEmail, amount, currency, status, reference)
      .run();

    return Response.json({
      success: true,
      message: 'Donation recorded successfully',
      id,
    });
  } catch (error: any) {
    console.error('Verification handler error:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
};
