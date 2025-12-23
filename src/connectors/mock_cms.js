// Mock CMS connector used for local development and tests
module.exports = {
  async topPages() {
    // return a minimal list of page objects
    return [
      {title: 'Downtown Holiday Market', url: 'https://example.com/article1', summary: 'The annual market in downtown St. Augustine saw a 15% increase in attendance this year.'},
      {title: 'Acme Roofing expands to Ponte Vedra', url: 'https://example.com/article2', summary: 'Acme expanded service to Ponte Vedra Beach.'},
      {title: 'County Road Works Update', url: 'https://example.com/article3', summary: 'Short summary about infrastructure updates and expected delays.'}
    ];
  }
};