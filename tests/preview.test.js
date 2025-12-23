const fs = require('fs');
const path = require('path');
const {execSync} = require('child_process');

describe('preview script', () => {
  it('generates landing preview html', () => {
    execSync('node scripts/preview/render_preview.js --type=landing', {stdio: 'inherit'});
    const out = path.resolve('tmp/preview-landing.html');
    expect(fs.existsSync(out)).toBe(true);
    const content = fs.readFileSync(out, 'utf8');
    expect(content).toContain('Serving St. Johns County');
  });

  it('generates newsletter preview html', () => {
    execSync('node scripts/preview/render_preview.js --type=newsletter', {stdio: 'inherit'});
    const out = path.resolve('tmp/preview-newsletter.html');
    expect(fs.existsSync(out)).toBe(true);
    const content = fs.readFileSync(out, 'utf8');
    expect(content).toContain('Here are this week\'s highlights for St. Johns County');
  }, 20000);
});