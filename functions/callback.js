export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  
  if (!code) {
    return new Response('No code provided', { status: 400 });
  }
  
  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: env.GITHUB_CLIENT_ID || 'Ov23licKOpONsGzlaXy1',
        client_secret: env.GITHUB_CLIENT_SECRET,
        code: code,
      }),
    });
    
    const data = await tokenResponse.json();
    
    if (data.access_token) {
      // Return HTML that posts the token back to the CMS
      return new Response(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Authorizing...</title>
        </head>
        <body>
          <script>
            (function() {
              const token = ${JSON.stringify(data.access_token)};
              const provider = 'github';
              
              console.log('Token received:', token);
              
              // Send auth message
              if (window.opener) {
                window.opener.postMessage(
                  'authorization:' + provider + ':success:' + JSON.stringify({
                    token: token,
                    provider: provider
                  }),
                  '*'
                );
                console.log('Auth message sent to opener');
              }
              
              setTimeout(function() {
                window.close();
              }, 1000);
            })();
          </script>
          <p>Authorization successful! Closing window...</p>
        </body>
        </html>
      `, {
        headers: { 'Content-Type': 'text/html' },
      });
    } else {
      throw new Error('No access token received');
    }
  } catch (error) {
    return new Response(`Authorization failed: ${error.message}`, { status: 500 });
  }
}
