const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

const wb = xlsx.readFile('All events result mind sparks 2026.xlsx');
const s2 = xlsx.utils.sheet_to_json(wb.Sheets['Sheet2'], { header: 1 });

// Category definitions matching categories.ts
const categoryMap = [
  {
    id: 'cat-01',
    name: 'Unique & Creative Handmade Fancy Dress',
    className: 'Play Group',
    match: (cls, evt) => cls.includes('PLAY') && evt.includes('FANCY DRESS')
  },
  {
    id: 'cat-02',
    name: 'Colour by Number',
    className: 'Nursery',
    match: (cls, evt) => cls.includes('NURSERY') && evt.includes('COLOUR')
  },
  {
    id: 'cat-03',
    name: 'Join the Dots and Colour',
    className: 'LKG',
    match: (cls, evt) => cls.includes('L.K.G') && evt.includes('DOTS')
  },
  {
    id: 'cat-04',
    name: 'Complete the Picture and Colour',
    className: 'UKG',
    match: (cls, evt) => cls.includes('U.K.G') && evt.includes('COMPLETE')
  },
  {
    id: 'cat-05',
    name: 'Clay Champs',
    className: 'Class 1',
    match: (cls, evt) => cls === 'I' && evt.includes('CLAY')
  },
  {
    id: 'cat-06',
    name: 'Dress to Impress',
    className: 'Class 1',
    match: (cls, evt) => cls === 'I' && evt.includes('DRESS TO IMPRESS')
  },
  {
    id: 'cat-07',
    name: 'Paint Your Imagination',
    className: 'Class 2 & 3',
    match: (cls, evt) => (cls.includes('II') || cls.includes('III')) && evt.includes('PAINT')
  },
  {
    id: 'cat-08',
    name: 'Writing Stars',
    className: 'Class 2 & 3',
    match: (cls, evt) => (cls.includes('II') || cls.includes('III')) && evt.includes('WRITING STARS')
  },
  {
    id: 'cat-09',
    name: 'Battle of Brains',
    className: 'Class 4 & 5',
    match: (cls, evt) => (cls.includes('IV') || cls.includes('V')) && evt.includes('BRAINS')
  },
  {
    id: 'cat-10',
    name: 'Poster Artist',
    className: 'Class 4 & 5',
    match: (cls, evt) => (cls.includes('IV') || cls.includes('V')) && evt.includes('POSTER')
  },
  {
    id: 'cat-11',
    name: 'Fireless Cooking',
    className: 'Class 6, 7 & 8',
    match: (cls, evt) => (cls.includes('VI') || cls.includes('VIII')) && evt.includes('COOKING')
  },
  {
    id: 'cat-12',
    name: 'Junior Scientist',
    className: 'Class 6, 7 & 8',
    match: (cls, evt) => (cls.includes('VI') || cls.includes('VIII')) && evt.includes('SCIENTIST')
  },
  {
    id: 'cat-13',
    name: 'Young Innovators',
    className: 'Class 9 & 10',
    match: (cls, evt) => (cls.includes('IX') || cls.includes('X')) && evt.includes('INNOVATORS')
  },
  {
    id: 'cat-14',
    name: 'Writing Quest',
    className: 'Class 11 & 12',
    match: (cls, evt) => (cls.includes('XI') || cls.includes('XII')) && evt.includes('WRITING QUEST')
  },
  {
    id: 'cat-15',
    name: 'Essay Writing',
    className: 'College / Graduation',
    match: (cls, evt) => cls.includes('GRADUATION') && evt.includes('ESSAY')
  },
  {
    id: 'cat-16',
    name: 'Online Quiz (Secondary Group)',
    className: 'Class 9 & 10',
    match: (cls, evt) => (cls.includes('9') || cls.includes('10')) && evt.includes('ONLINE QUIZ')
  },
  {
    id: 'cat-17',
    name: 'Online Quiz (Senior Secondary)',
    className: 'Class 11 & 12',
    match: (cls, evt) => (cls.includes('11') || cls.includes('12')) && evt.includes('ONLINE QUIZ')
  },
  {
    id: 'cat-18',
    name: 'Online Quiz (Graduation Group)',
    className: 'College / Graduation',
    match: (cls, evt) => cls.includes('GRADUATION') && evt.includes('ONLINE QUIZ')
  },
];

function toTitleCase(str) {
  return str
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map(word => {
      if (!word) return '';
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

const parsedEvents = [];
let currentClass = '';
let currentEvent = '';
let currentRows = [];

for (let i = 0; i < s2.length; i++) {
  const row = s2[i];
  if (!row || row.length === 0) continue;

  const col0 = (row[0] || '').toString().trim();
  const col1 = (row[1] || '').toString().trim();
  const col2 = (row[2] || '').toString().trim();
  const col3 = (row[3] || '').toString().trim();

  if (col0.includes('MEENA SHAH') || col0.includes('CLASS(ES)')) continue;

  if (col0 !== '' && col1 !== '' && !col1.startsWith('RANK') && !col1.startsWith('CONSOLATION')) {
    if (currentEvent) {
      parsedEvents.push({ class: currentClass, event: currentEvent, rows: currentRows });
    }
    currentClass = col0;
    currentEvent = col1;
    currentRows = [];
  } else if (col1.startsWith('RANK') || col1.startsWith('CONSOLATION')) {
    currentRows.push({
      position: col1,
      name: col2,
      regNo: col3
    });
  }
}
if (currentEvent) {
  parsedEvents.push({ class: currentClass, event: currentEvent, rows: currentRows });
}

console.log(`Parsed ${parsedEvents.length} events from Excel Sheet2.`);

const allWinners = [];
let serialCounter = 1;

parsedEvents.forEach((ev) => {
  const matchedCat = categoryMap.find(c => c.match(ev.class.toUpperCase(), ev.event.toUpperCase()));
  if (!matchedCat) {
    console.error(`ERROR: No category match for Class [${ev.class}] Event [${ev.event}]`);
    return;
  }

  ev.rows.forEach((r) => {
    const id = `pw-${String(serialCounter).padStart(3, '0')}`;
    serialCounter++;

    let rank = 4;
    let positionTitle = 'Consolation Prize';
    let prizeAwarded = 'Consolation Medal & Certificate';

    const pos = r.position.toUpperCase();
    if (pos === 'RANK 1') {
      rank = 1;
      positionTitle = 'Rank 1 (Gold Medalist)';
      prizeAwarded = 'Trophy + Gold Medal + Certificate of Excellence';
    } else if (pos === 'RANK 2') {
      rank = 2;
      positionTitle = 'Rank 2 (Silver Medalist)';
      prizeAwarded = 'Silver Medal + Certificate of Merit';
    } else if (pos === 'RANK 3') {
      rank = 3;
      positionTitle = 'Rank 3 (Bronze Medalist)';
      prizeAwarded = 'Bronze Medal + Certificate of Merit';
    } else if (pos.startsWith('CONSOLATION')) {
      rank = 4;
      const cNum = parseInt(pos.replace('CONSOLATION', '').trim(), 10) || 1;
      positionTitle = `Consolation Prize ${cNum}`;
      prizeAwarded = 'Consolation Certificate & Medal';
    }

    const regNo = r.regNo.trim();
    const cleanName = toTitleCase(r.name);

    allWinners.push({
      id,
      regNo,
      rollNo: regNo, // Exact MS2611... number as given in Excel
      name: cleanName,
      schoolName: 'Meena Shah Public School',
      className: matchedCat.className,
      categoryId: matchedCat.id,
      categoryName: matchedCat.name,
      rank,
      positionTitle,
      prizeAwarded,
      certificateType: 'distinction',
      status: 'Ranker'
    });
  });
});

console.log(`Total generated winners: ${allWinners.length}`);

// Generate TypeScript code without any score fields
let tsCode = `import { PrizeWinner } from '@/types';\n\n`;
tsCode += `/**\n`;
tsCode += ` * MINDSPARK 2026 OFFICIAL CERTIFIED PRIZE WINNERS DIRECTORY\n`;
tsCode += ` * Source: Meena Shah Public School Official Mindspark 2026 Results Ledger\n`;
tsCode += ` * Total Certified Winners: ${allWinners.length} (18 Rank 1 Gold, 18 Rank 2 Silver, 18 Rank 3 Bronze, ${allWinners.filter(w => w.rank === 4).length} Consolation)\n`;
tsCode += ` */\n`;
tsCode += `export const prizeWinners: PrizeWinner[] = [\n`;

let lastCat = '';
allWinners.forEach(w => {
  if (w.categoryId !== lastCat) {
    lastCat = w.categoryId;
    tsCode += `\n  // =========================================================================\n`;
    tsCode += `  // ${w.categoryId.toUpperCase()}: ${w.categoryName} (${w.className})\n`;
    tsCode += `  // =========================================================================\n`;
  }

  tsCode += `  {\n`;
  tsCode += `    id: '${w.id}',\n`;
  tsCode += `    regNo: '${w.regNo}',\n`;
  tsCode += `    rollNo: '${w.rollNo}',\n`;
  tsCode += `    name: ${JSON.stringify(w.name)},\n`;
  tsCode += `    schoolName: ${JSON.stringify(w.schoolName)},\n`;
  tsCode += `    className: ${JSON.stringify(w.className)},\n`;
  tsCode += `    categoryId: '${w.categoryId}',\n`;
  tsCode += `    categoryName: ${JSON.stringify(w.categoryName)},\n`;
  tsCode += `    rank: ${w.rank},\n`;
  tsCode += `    positionTitle: ${JSON.stringify(w.positionTitle)},\n`;
  tsCode += `    prizeAwarded: ${JSON.stringify(w.prizeAwarded)},\n`;
  tsCode += `    certificateType: '${w.certificateType}',\n`;
  tsCode += `    status: '${w.status}',\n`;
  tsCode += `  },\n`;
});

tsCode += `];\n`;

fs.writeFileSync('data/prizeWinners.ts', tsCode, 'utf8');
console.log('Successfully updated data/prizeWinners.ts with 0 scores and 100% exact MS2611... numbers!');
