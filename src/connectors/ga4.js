// GA4 connector stub
// Placeholder implementation. To enable real GA4 access, add a service account JSON
// as a secret (e.g., GA4_SA_KEY) and implement auth+reporting here.

async function topPagesMetrics(){
  // If GA4 service account isn't configured, return an empty list to avoid failing pipelines
  if (!process.env.GA4_SA_KEY) {
    return [];
  }

  // TODO: Implement GA4 Data API calls using GA4 property ID and SA credentials
  // This is a placeholder to be implemented after secrets are provided.
  return [];
}

module.exports = {topPagesMetrics};