import fs from 'node:fs/promises';

// Název tvojí složky / souboru se staženým seznamem
const INPUT_FILE = 'combined_blocklist.txt'; 
const OUTPUT_FILE = 'pihole_blocklist.txt';

function cleanDomain(line) {
  let clean = line.trim();
  
  // Ignorovat prázdné řádky a komentáře
  if (!clean || clean.startsWith('!') || clean.startsWith('#')) return null;

  // Odstranit AdGuard / Adblock Plus syntaxi (||domain.com^)
  if (clean.startsWith('||')) {
    clean = clean.slice(2);
  }
  if (clean.endsWith('^')) {
    clean = clean.slice(0, -1);
  }

  // Odstranit IP adresy z klasických hosts souborů (0.0.0.0 nebo 127.0.0.1)
  clean = clean.replace(/^(0\.0\.0\.0|127\.0\.0\.1)\s+/, '');

  // Vynechat pravidla s URL cestami, žolíky (*) nebo speciálními modifikátory ($)
  if (clean.includes('/') || clean.includes('*') || clean.includes('$')) return null;

  return clean.toLowerCase();
}

async function convertFile() {
  try {
    const rawContent = await fs.readFile(INPUT_FILE, 'utf-8');
    const lines = rawContent.split(/\r?\n/);
    const uniqueDomains = new Set();

    for (const line of lines) {
      const domain = cleanDomain(line);
      if (domain) {
        uniqueDomains.add(domain);
      }
    }

    const outputContent = Array.from(uniqueDomains).sort().join('\n');
    await fs.writeFile(OUTPUT_FILE, outputContent, 'utf-8');

    console.log(`✓ Hotovo! Zpracováno a uloženo ${uniqueDomains.size} čistých domén do ${OUTPUT_FILE}`);
  } catch (err) {
    console.error(`✗ Chyba při zpracování souboru:`, err.message);
  }
}

convertFile();