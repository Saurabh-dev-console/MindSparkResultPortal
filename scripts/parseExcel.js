const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');

const wb = xlsx.readFile('All events result mind sparks 2026.xlsx');
const s2 = xlsx.utils.sheet_to_json(wb.Sheets['Sheet2'], { header: 1 });

const events = [];
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
  
  // Detect event section header: has class name or event name
  // Note: in row 10, ["NURSERY", "COLOUR BY NUMBERS"]
  if (col0 !== '' && col1 !== '' && !col1.startsWith('RANK') && !col1.startsWith('CONSOLATION')) {
    if (currentEvent) {
      events.push({ class: currentClass, event: currentEvent, rows: currentRows });
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
  events.push({ class: currentClass, event: currentEvent, rows: currentRows });
}

console.log('Total events found: ' + events.length);
events.forEach((e, idx) => {
  const r1 = e.rows[0];
  console.log((idx + 1) + '. Class: [' + e.class + '] | Event: [' + e.event + '] -> ' + e.rows.length + ' winners | R1: ' + (r1 ? r1.name + ' (' + r1.regNo + ')' : 'none'));
});

