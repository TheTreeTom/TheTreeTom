const fs = require('fs');
const path = require('path');
const {generateDraft} = require('../src/generator');

describe('generator', () => {
  it('generates a draft file', async () => {
    const out = await generateDraft();
    expect(fs.existsSync(out)).toBe(true);
    const content = fs.readFileSync(out, 'utf8');
    expect(content).toMatch(/St. Johns County Weekly/);
  });
});