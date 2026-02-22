/**
 * Cloudflare Worker - AI Chat Proxy
 * Route this worker to /ai-chat on your domain.
 */

export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        // Only handle /ai-chat API route
        if (url.pathname !== '/ai-chat') {
            // Serve static site for all other paths
            return fetch(request);
        }
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Content-Type': 'application/json'
        };

        if (request.method === 'OPTIONS') {
            return new Response('', { status: 200, headers });
        }

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

            const openrouterKey = env.OPENROUTER_API_KEY;
            if (!openrouterKey) {
                return new Response(
                    JSON.stringify({ error: 'AI service not configured' }),
                    { status: 500, headers }
                );
            }

            const model = 'arcee-ai/trinity-large-preview:free';
            const systemPrompt = `You are an intelligent assistant for Neostore, a leading digital transformation company in Croatia.

SERVICES:
1. Web Design - responsive websites, e-commerce, CMS
2. AI Solutions - automation, analytics, training
3. Telecommunications - mobile, internet, financing
4. Business Planning - financing programs, consulting

CONTACT: +385 95 2229994, info@neostore-platform.hr
ADDRESS: Alberta Ognjana Strige 7, 10000 Zagreb
HOURS: Mon-Fri 09:00-17:00 (24/7 for telecom)

FINANCING: HAMAG-BICRO grants, HBOR loans, Self-employment support

Respond in ${language === 'en' ? 'English' : 'Croatian'}. Be helpful and professional.`;

            const openrouterResponse = await fetch(
                'https://openrouter.ai/api/v1/chat/completions',
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${openrouterKey}`,
                        'Content-Type': 'application/json',
                        'HTTP-Referer': 'https://neostore-platform.hr',
                        'X-Title': 'Neostore AI Chatbot'
                    },
                    body: JSON.stringify({
                        model,
                        messages: [
                            { role: 'system', content: systemPrompt },
                            { role: 'user', content: message }
                        ]
                    })
                }
            );

            if (!openrouterResponse.ok) {
                const errorText = await openrouterResponse.text();
                return new Response(
                    JSON.stringify({ error: 'OpenRouter API error', details: errorText }),
                    { status: 502, headers }
                );
            }

            const data = await openrouterResponse.json();
            let response = '';
            if (data.choices && data.choices[0] && data.choices[0].message) {
                response = data.choices[0].message.content || '';
            }

            return new Response(
                JSON.stringify({ response: response || 'Unable to generate response', success: true }),
                { status: 200, headers }
            );
        } catch (error) {
            return new Response(
                JSON.stringify({ error: 'Internal error', message: error.message }),
                { status: 500, headers }
            );
        }
    }
};
