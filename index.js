const alfy = require('alfy');
const openPRsCmd = require('./open_prs');
const starsCmd = require('./stars');

const commands = {
  open_prs: openPRsCmd,
  stars: starsCmd,
};

async function main() {
  const cmdInput = process.argv[2];
  const searchInput = process.argv[3];
  if (!cmdInput) return [];
  try {
    const cmd = commands[cmdInput.toLowerCase()];
    const items = await cmd(searchInput);
    return items;
  } catch (e) {
    return [];
  }
}

main().then(alfy.output);
