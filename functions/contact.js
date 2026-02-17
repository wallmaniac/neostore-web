export async function onRequest(context) {
  const { request } = context;
  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS, GET',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  }

  try {
    const formData = await request.formData();
    
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const message = formData.get('message');

    // Send email via MailChannels (best-effort, do not fail the request)
    try {
      const emailResponse = await fetch('https://api.mailchannels.net/tx/v1/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: [
                {
                  email: 'info@neostore-platform.hr',
                  name: 'Neostore Info'
                }
              ],
              reply_to: {
                email: email,
                name: name
              }
            }
          ],
          from: {
            email: 'noreply@neostore-platform.hr',
            name: 'Neostore Platform'
          },
          subject: `Nova poruka od ${name}`,
          content: [
            {
              type: 'text/html',
              value: `
                <h2>Nova poruka sa kontakt forme</h2>
                <p><strong>Ime:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Telefon:</strong> ${phone}</p>
                <p><strong>Poruka:</strong></p>
                <p>${(message || '').toString().replace(/\n/g, '<br>')}</p>
              `
            }
          ]
        })
      });

      console.log('MailChannels response status:', emailResponse.status);
    } catch (mailError) {
      console.error('MailChannels send error (ignored for client):', mailError);
    }

    console.log('Form submission processed:', { name, email, phone });

    return new Response(JSON.stringify({ success: true, message: 'Poruka je poslana' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    console.error('Form error:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
};
