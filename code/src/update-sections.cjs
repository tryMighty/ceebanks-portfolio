const fs = require('fs');
const path = require('path');

const appTsxPath = path.join(__dirname, 'App.tsx');
let content = fs.readFileSync(appTsxPath, 'utf8');

// 1. Change <main> background to #F7E9E8
content = content.replace(
  '<main className="relative z-10 bg-[#282828] overflow-hidden">',
  '<main className="relative z-10 bg-[#F7E9E8] overflow-hidden">'
);

// 2. Add bg-[#282828] text-[#F7E9E8] to footer
content = content.replace(
  '<footer className="border-t border-[#F7E9E8]/8 py-10">',
  '<footer className="border-t border-[#F7E9E8]/10 py-10 bg-[#282828] text-[#F7E9E8] relative z-20">'
);

// 3. Extract the sections between "SECTIONS BELOW HERO" and "Footer"
let startIndex = content.indexOf('SECTIONS BELOW HERO');
if (startIndex === -1) {
    console.error("Could not find start");
    process.exit(1);
}
// walk back to the start of the comment
startIndex = content.lastIndexOf('{/*', startIndex);

const footerStartStr = '{/* ── Footer ──────────────────────────────────────────────────────── */}';
const endIndex = content.indexOf(footerStartStr);
if (endIndex === -1) {
    console.error("Could not find footer start");
    process.exit(1);
}

const beforeSections = content.slice(0, startIndex);
let sectionsContent = content.slice(startIndex, endIndex);
const afterSections = content.slice(endIndex);

// 4. Perform replacements in sectionsContent
sectionsContent = sectionsContent.replace(/#F7E9E8/g, '#1A1A1A');
sectionsContent = sectionsContent.replace('Dark background', 'Light background');

// Reassemble
const newContent = beforeSections + sectionsContent + afterSections;

fs.writeFileSync(appTsxPath, newContent, 'utf8');
console.log('Successfully updated sections to light theme!');
