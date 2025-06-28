export default {
  async fetch(request, env) {
    const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com';
    
    // Parse URL request
    const url = new URL(request.url);
    const apiPath = url.pathname.replace('/proxy', ''); // Menghapus prefix route jika ada
    const key = url.searchParams.get('key'); // Mengambil nilai parameter 'key' jika ada

    // Validasi path
    if (!apiPath.startsWith('/v1beta/')) {
      return new Response('Invalid API path', { status: 400 });
    }

    // Bangun URL target
    const targetUrl = `${GEMINI_API_BASE}${apiPath}?${url.searchParams.toString()}`;

    // Persiapkan headers
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    
    // Jika menggunakan API Key
    headers.set('x-goog-api-key', key || request.headers.get('x-goog-api-key')); // Use key from URL or fallback to header

    try {
      const response = await fetch(targetUrl, {
        method: request.method,
        headers: headers,
        body: request.body,
        redirect: 'follow'
      });
      
      // Teruskan response asli dari Gemini API
      return new Response(response.body, {
        status: response.status,
        headers: response.headers
      });
    } catch (error) {
      return new Response(JSON.stringify({
        error: 'Proxy error',
        message: error.message
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
}
