export async function onRequest() {
  return new Response(JSON.stringify({ success: true, message: 'Poruka je poslana' }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}
