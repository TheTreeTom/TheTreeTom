const fetch = global.fetch || require('node-fetch');

// WordPress connector - minimal implementation using WP REST API
// Expects environment variables (placeholders):
// WP_API_URL - base URL, e.g., https://example.com
// WP_API_KEY - optional Bearer token or API key

async function topPages({perPage = 10} = {}){
  const base = process.env.WP_API_URL;
  if (!base) {
    throw new Error('WP_API_URL not set; WordPress connector disabled.');
  }
  const url = new URL('/wp-json/wp/v2/posts', base);
  url.searchParams.set('per_page', String(perPage));
  url.searchParams.set('orderby', 'modified');

  const headers = {};
  if (process.env.WP_API_KEY) {
    // support bearer token
    headers['Authorization'] = `Bearer ${process.env.WP_API_KEY}`;
  }

  const res = await fetch(url.toString(), {headers});
  if (!res.ok) {
    const txt = await res.text().catch(()=>'<no body>');
    throw new Error(`WP API error ${res.status}: ${txt}`);
  }
  const posts = await res.json();
  // Map WordPress post objects to {title, url, summary}
  return posts.map(p => ({
    title: (p.title && p.title.rendered) || p.title || 'Untitled',
    url: (p.link) || '',
    summary: (p.excerpt && p.excerpt.rendered && p.excerpt.rendered.replace(/<[^>]+>/g, '').trim()) || ''
  }));
}

module.exports = {topPages};