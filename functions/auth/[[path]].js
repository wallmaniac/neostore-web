export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  
  // Handle OAuth callback from GitHub
  if (url.pathname === '/auth/callback') {
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
              window.opener.postMessage(
                'authorization:github:success:${JSON.stringify({ token: data.access_token, provider: 'github' })}',
                window.location.origin
              );
              window.close();
            </script>
            <p>Authorization successful! This window will close automatically.</p>
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
  
  // Handle initial auth request
  if (url.pathname === '/auth') {
    const clientId = env.GITHUB_CLIENT_ID || 'Ov23licKOpONsGzlaXy1';
    const redirectUri = `${url.origin}/auth/callback`;
    const scope = 'repo,user';
    
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}`;
    
    return Response.redirect(githubAuthUrl, 302);
  }
  
  return new Response('Not found', { status: 404 });
}
