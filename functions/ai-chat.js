/**
 * AI Chat Proxy - Forwards HuggingFace API requests from browser
 * This bypasses CORS issues by proxying through the server
 */

const fetch = require('node-fetch');

exports.handler = async (event, context) => {
    // Set CORS headers to allow browser requests
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    };

    // Handle preflight requests
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    try {
        // Parse incoming request
        const body = JSON.parse(event.body);
        const { message, language = 'en' } = body;

        if (!message) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Message is required' })
            };
        }

        // Get HF token from environment or return error
        const HF_TOKEN = process.env.HUGGING_FACE_TOKEN;
        if (!HF_TOKEN) {
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: 'AI service not configured' })
            };
        }

        // Build the prompt
        const neotelContext = `You are an intelligent assistant for Neostore, a leading digital transformation company in Croatia.

NEOSTORE SERVICES:
1. Web Design - responsive websites, e-commerce, CMS, custom applications
2. AI Solutions - automation, data analytics, team training
3. Telecommunications - mobile services, internet, device financing, insurance, 24/7 support
4. Business Planning - financing programs (HAMAG-BICRO, HBOR), business consulting

NEOSTORE CONTACT:
- Phone: +385 95 2229994
- Email: info@neostore-platform.hr
- Address: Alberta Ognjana Štrige 7, 10000 Zagreb, Croatia
- Hours: Monday-Friday 09:00-17:00 (24/7 for telecom)

Respond in ${language === 'en' ? 'English' : 'Croatian'} only. Be helpful and professional.`;

        const prompt = `${neotelContext}\n\nUser: ${message}\nAssistant:`;

        // Call HuggingFace API
        const response = await fetch(
            'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2',
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${HF_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    inputs: prompt,
                    parameters: {
                        max_new_tokens: 512,
                        temperature: 0.7,
                        top_p: 0.9
                    }
                })
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`HF API Error: ${response.status}`, errorText);
            
            return {
                statusCode: response.status,
                headers,
                body: JSON.stringify({ 
                    error: 'AI service error',
                    details: errorText 
                })
            };
        }

        const data = await response.json();

        // Extract response text
        let aiResponse = '';
        if (Array.isArray(data)) {
            aiResponse = data[0]?.generated_text || '';
        } else {
            aiResponse = data.generated_text || '';
        }

        // Clean up the response
        if (aiResponse.includes('Assistant:')) {
            aiResponse = aiResponse.split('Assistant:')[1].trim();
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ 
                response: aiResponse || 'Unable to generate response',
                success: true
            })
        };

    } catch (error) {
        console.error('AI Chat Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                error: 'Internal server error',
                message: error.message 
            })
        };
    }
};
