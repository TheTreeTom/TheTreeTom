#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const {execSync} = require('child_process');
const cms = require('../connectors/mock_cms');

function formatDate(d) {
  return d.toISOString().slice(0,10);
}

async function generateDraft(opts = {}){
  const date = formatDate(new Date());
  const items = await cms.topPages();
  const draft = `---\ntitle: "St. Johns County Weekly — ${date}"\ndate: ${date}\nlocale: "st-johns-county"\nsource: "mock-cms/top-pages"\n---\n\n` + items.slice(0,3).map((it,i)=>`**${i+1}. ${it.title}** — ${it.summary} [Read more](${it.url})\n\n`).join('') + `---\n\nLocal contact:\n- Address: 123 Example St., St. Augustine, FL 32084\n- Phone: (904) 555-0100\n\nThis is an automated draft generated for review. Approver: @marketing-team\n`;

  const fileName = `st-johns-${date}.md`;
  const outPath = path.resolve('content/drafts', fileName);
  fs.mkdirSync(path.dirname(outPath), {recursive:true});
  fs.writeFileSync(outPath, draft, 'utf8');
  console.log('Generated draft at', outPath);

  if (opts.createPR) {
    const branch = `agent/generated/st-johns-${date}`;
    execSync(`git checkout -b ${branch}`);
    execSync(`git add ${outPath}`);
    execSync(`git commit -m "chore: add generated St. Johns draft ${fileName}"`);
    execSync(`git push -u origin ${branch}`);
    // Use gh CLI to create PR if available
    try {
      execSync(`gh pr create --fill --title "[Automated] St. Johns draft ${date}" --body "Generated draft for review."`);
      console.log('PR created via gh CLI');
    } catch (err) {
      console.warn('gh CLI not available or failed to create PR; created branch only.');
    }
  }
  return outPath;
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const opts = {createPR: args.includes('--pr')};
  generateDraft(opts).catch(err=>{console.error(err); process.exit(1);});
}

module.exports = {generateDraft};