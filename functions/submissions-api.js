export default async (request, context) => {
  if (request.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Only GET allowed' }), { 
      status: 405,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }

  try {
    // Get all submissions from KV
    const submissions = [];
    
    if (context.env && context.env.SUBMISSIONS) {
      // List all keys in KV namespace
      const list = await context.env.SUBMISSIONS.list();
      
      // Get each submission
      for (const key of list.keys) {
        const value = await context.env.SUBMISSIONS.get(key.name);
        if (value) {
          submissions.push(JSON.parse(value));
        }
      }
    }
    
    // Sort by timestamp descending
    submissions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    return new Response(JSON.stringify(submissions), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error) {
    console.error('Error fetching submissions:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
};
