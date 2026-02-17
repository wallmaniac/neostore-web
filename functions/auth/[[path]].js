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
        // Return a proper HTML page that uses the official postMessage format
        const html = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <title>Authorization Complete</title>
            <script>
              // Use the exact format from netlify-cms-oauth-provider
              (function() {
                function receiveMessage(e) {
                  console.log("receiveMessage", e);
                  window.opener.postMessage(
                    'authorization:github:success:' + JSON.stringify({
                      token: "${data.access_token}",
                      provider: "github"
                    }),
                    e.origin
                  );
                }
                window.addEventListener("message", receiveMessage, false);
                // Send to opener
                window.opener.postMessage("authorizing:github", "*");
              })()
            </script>
          </head>
          <body>
            <p>Authorizing...</p>
          </body>
          </html>
        `;
        
        return new Response(html, {
          headers: { 'Content-Type': 'text/html' },
        });
      } else {
        throw new Error('No access token received: ' + JSON.stringify(data));
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
