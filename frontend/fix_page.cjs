const fs = require('fs');

let content = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Add Image import if not exists
if (!content.includes("import Image from 'next/image';")) {
  content = content.replace(
    "import React, { useState, useEffect } from 'react';",
    "import React, { useState, useEffect } from 'react';\nimport Image from 'next/image';"
  );
}

// 2. Add aria-labels to buttons
content = content.replace(/<button onClick=\{\(\) => scrollCarousel\(([^,]+), 'left'\)\} className="p-2/g, '<button aria-label="Previous item" onClick={() => scrollCarousel($1, \'left\')} className="p-2');
content = content.replace(/<button onClick=\{\(\) => scrollCarousel\(([^,]+), 'right'\)\} className="p-2/g, '<button aria-label="Next item" onClick={() => scrollCarousel($1, \'right\')} className="p-2');

// 3. Replace <img src="..." alt="..." className="... w-full h-full object-cover" />
// We need to carefully replace <img ... > with <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" ... />
content = content.replace(/<img([\s\S]*?)w-full h-full([\s\S]*?)\/>/g, (match, p1, p2) => {
  // remove w-full h-full from p1/p2 or keep it, `fill` implies absolute inset-0 w-full h-full, but keeping Tailwind classes is fine
  return `<Image fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" ${p1} w-full h-full ${p2} />`;
});

// Also replace `<img src="/madina/..."` that don't have w-full h-full?
// Only the ones rendered dynamically or statically as covers.
content = content.replace(/<img([\s\S]*?)\/>/g, (match) => {
  if (match.includes('<Image')) return match; // already replaced
  return match.replace('<img', '<Image fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"');
});

// Fix CLS minimum height on Hero
content = content.replace(
  'className="lg:col-span-7 flex flex-col items-start text-start"',
  'className="lg:col-span-7 flex flex-col items-start text-start min-h-[320px] justify-center"'
);

// We need to clean up Next.js Image attributes since it cannot have `loading="eager"` and `fill` together easily without priorities sometimes, but Next.js allows priority={true}. Let's change loading="eager" to priority={true}.
content = content.replace(/loading="eager"/g, 'priority={true}');

fs.writeFileSync('src/app/page.tsx', content);
console.log('Fixed page.tsx');
