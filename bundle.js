import fs from 'node:fs/promises';

const urls = [
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_1.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_24.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_70.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_59.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_53.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_4.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_34.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_48.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_51.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_49.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_5.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_27.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_3.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_69.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_33.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_39.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_6.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_45.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_46.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_67.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_47.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_66.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_61.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_65.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_63.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_60.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_7.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_57.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_29.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_21.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_35.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_22.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_19.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_43.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_25.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_15.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_36.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_20.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_13.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_41.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_14.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_17.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_26.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_40.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_16.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_30.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_12.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_55.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_71.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_54.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_52.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_56.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_44.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_68.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_8.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_18.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_10.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_42.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_31.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_9.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_50.txt',
  'https://adguardteam.github.io/HostlistsRegistry/assets/filter_11.txt',
  'https://adblock.turtlecute.org/d3host.txt',
  'https://adblock.turtlecute.org/d3host.adblock'
];

async function generateBlocklist() {
  const uniqueDomains = new Set();
  console.log(`Stahuji ${urls.length} listů...`);

  for (const url of urls) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      
      const lines = text.split('\n');
      for (let line of lines) {
        line = line.trim();
        if (line && !line.startsWith('!') && !line.startsWith('#')) {
          uniqueDomains.add(line);
        }
      }
      console.log(`✓ Staženo: ${url}`);
    } catch (err) {
      console.error(`✗ Chyba při stahování ${url}:`, err.message);
    }
  }

  const outputContent = Array.from(uniqueDomains).join('\n');
  await fs.writeFile('combined_blocklist.txt', outputContent, 'utf-8');
  console.log(`\nHotovo! Celkem uloženo ${uniqueDomains.size} unikátních záznamů do combined_blocklist.txt`);
}

generateBlocklist();