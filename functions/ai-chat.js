/**
 * AI Chat API for Cloudflare Pages
 * Handles HuggingFace API requests from the browser
 */

export async function onRequest(context) {
    const { request, env } = context;
    // Set CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    };

    // Handle preflight
    if (request.method === 'OPTIONS') {
        return new Response('', { status: 200, headers });
    }

    // Only accept POST
    if (request.method !== 'POST') {
        return new Response(
            JSON.stringify({ error: 'Method not allowed' }),
            { status: 405, headers }
        );
    }

    try {
        const body = await request.json();
        const { message = '', language = 'en' } = body;

        if (!message) {
            return new Response(
                JSON.stringify({ error: 'Message is required' }),
                { status: 400, headers }
            );
        }

        // Get token from environment variable
        const HF_TOKEN = env.HUGGING_FACE_TOKEN;
        if (!HF_TOKEN) {
            console.error('HUGGING_FACE_TOKEN not configured');
            return new Response(
                JSON.stringify({ error: 'AI service not configured' }),
                { status: 500, headers }
            );
        }

        // Build the prompt
        const systemPrompt = `You are an intelligent assistant for Neostore, a leading digital transformation company in Croatia.

SERVICES:
1. Web Design - responsive websites, e-commerce, CMS
2. AI Solutions - automation, analytics, training
3. Telecommunications - mobile, internet, financing
4. Business Planning - financing programs, consulting

CONTACT: +385 95 2229994, info@neostore-platform.hr
ADDRESS: Alberta Ognjana Štrige 7, 10000 Zagreb
HOURS: Mon-Fri 09:00-17:00 (24/7 for telecom)

FINANCING: HAMAG-BICRO grants, HBOR loans, Self-employment support

Respond in ${language === 'en' ? 'English' : 'Croatian'}. Be helpful and professional.`;

        const userPrompt = `${systemPrompt}\n\nUser: ${message}\n\nAssistant:`;

        // Call HuggingFace API
        const hfResponse = await fetch(
            'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2',
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${HF_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    inputs: userPrompt,
                    parameters: {
                        max_new_tokens: 512,
                        temperature: 0.7,
                        top_p: 0.9
                    }
                })
            }
        );

        if (!hfResponse.ok) {
            const errorText = await hfResponse.text();
            console.error(`HF API Error ${hfResponse.status}:`, errorText);
            
            return new Response(
                JSON.stringify({ 
                    error: 'HuggingFace API error',
                    status: hfResponse.status
                }),
                { status: 502, headers }
            );
        }

        const data = await hfResponse.json();

        // Extract response
        let response = '';
        if (Array.isArray(data) && data[0]) {
            response = data[0].generated_text || '';
        } else if (data.generated_text) {
            response = data.generated_text;
        }

        // Clean up
        if (response.includes('Assistant:')) {
            response = response.split('Assistant:')[1].trim();
        }

        return new Response(
            JSON.stringify({ 
                response: response || 'Unable to generate response',
                success: true
            }),
            { status: 200, headers }
        );

    } catch (error) {
        console.error('AI API Error:', error);
        return new Response(
            JSON.stringify({ 
                error: 'Internal error',
                message: error.message
            }),
            { status: 500, headers }
        );
    }
}
