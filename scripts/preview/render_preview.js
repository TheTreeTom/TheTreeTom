#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const {exec} = require('child_process');

function parseArgs() {
  const args = {};
  process.argv.slice(2).forEach(a => {
    const [k,v] = a.split('=');
    if (k.startsWith('--')) args[k.slice(2)] = v || true;
  });
  return args;
}

function renderTemplate(template, data) {
  return template.replace(/{{\s*([\w\.]+)\s*}}/g, (_, key) => {
    const parts = key.split('.');
    let val = data;
    for (const p of parts) {
      if (val == null) return `{{${key}}}`;
      val = val[p];
    }
    return val == null ? `{{${key}}}` : val;
  });
}

function mdToHtml(md) {
  let html = md
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2">$1</a>');
  html = html.split('\n').map(line => `<p>${line}</p>`).join('\n');
  return `<!doctype html><html><head><meta charset="utf-8"></head><body>${html}</body></html>`;
}

function openFile(filePath) {
  const platform = process.platform;
  const cmd = platform === 'darwin' ? `open "${filePath}"` : platform === 'win32' ? `start "" "${filePath}"` : `xdg-open "${filePath}"`;
  exec(cmd, (err) => { if (err) console.error('Failed to open file:', err); });
}

(async function main(){
  const args = parseArgs();
  const type = args.type || 'landing';

  if (type === 'landing') {
    const templatePath = args.template || 'templates/landing/st-johns.html';
    const template = fs.readFileSync(templatePath, 'utf8');
    const data = {
      local_address: '123 Example St., St. Augustine, FL 32084',
      postal_code: '32084',
      local_phone: '(904) 555-0100'
    };
    const out = renderTemplate(template, data);
    const outPath = path.resolve('tmp/preview-landing.html');
    fs.mkdirSync(path.dirname(outPath), {recursive: true});
    fs.writeFileSync(outPath, out, 'utf8');
    console.log('Landing preview written to', outPath);
    openFile(outPath);
    return;
  }

  if (type === 'newsletter') {
    const draftPath = args.draft || 'content/drafts/st-johns-2025-12-23.md';
    const templatePath = 'templates/newsletter/st-johns.md';
    const draft = fs.readFileSync(draftPath, 'utf8');
    const template = fs.readFileSync(templatePath, 'utf8');

    // Basic parsing: extract title/date and first 3 bold items with optional URL and summary
    const dateMatch = draft.match(/date:\s*(\d{4}-\d{2}-\d{2})/i);
    const date = dateMatch ? dateMatch[1] : new Date().toISOString().slice(0,10);

    const itemRegex = /\*\*\d+\.\s*(.*?)\*\*\s*—\s*(.*?)\s*(?:\[Read more\]\((.*?)\))?/g;
    const items = [];
    let m;
    while ((m = itemRegex.exec(draft)) && items.length < 3) {
      items.push({title: m[1].trim(), summary: m[2].trim(), url: m[3] || '#'});
    }
    while (items.length < 3) items.push({title: 'TBD', summary:'', url:'#'});

    const data = {
      date,
      name: 'Subscriber',
      landing_url: 'templates/landing/st-johns.html',
      local_address: '123 Example St., St. Augustine, FL 32084',
      local_phone: '(904) 555-0100',
      unsubscribe_link: '#',
      item1: items[0],
      item2: items[1],
      item3: items[2]
    };

    const md = renderTemplate(template, data);
    const html = mdToHtml(md);
    const outPath = path.resolve('tmp/preview-newsletter.html');
    fs.mkdirSync(path.dirname(outPath), {recursive: true});
    fs.writeFileSync(outPath, html, 'utf8');
    console.log('Newsletter preview written to', outPath);
    openFile(outPath);
    return;
  }

  console.error('Unknown type. Use --type landing or --type newsletter');
})();
