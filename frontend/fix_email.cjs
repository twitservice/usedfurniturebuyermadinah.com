const fs = require('fs');

let content = fs.readFileSync('src/app/page.tsx', 'utf8');

const components = `
// Client-side obfuscated email components to prevent Cloudflare email-decode.min.js injection
const ProtectedEmail = ({ className = '' }: { className?: string }) => {
  const [email, setEmail] = useState<string | null>(null);
  useEffect(() => {
    setEmail(['Sabujhasan465', 'gmail.com'].join('@'));
  }, []);
  return email ? <span className={className}>{email}</span> : <span className="opacity-0 select-none">loading@...</span>;
};

const ProtectedEmailLink = ({ className = '', children }: { className?: string, children?: React.ReactNode }) => {
  const [email, setEmail] = useState<string | null>(null);
  useEffect(() => {
    setEmail(['Sabujhasan465', 'gmail.com'].join('@'));
  }, []);
  if (!email) return <span className="opacity-0 select-none">loading...</span>;
  return <a href={\`mailto:\${email}\`} className={className}>{children || email}</a>;
};
`;

if (!content.includes('ProtectedEmail')) {
  content = content.replace('export default function App() {', components + '\nexport default function App() {');
}

// 1. Line 220
content = content.replace(
  /<a href="mailto:Sabujhasan465@gmail\.com" className="([^"]+)">\s*<Mail className="w-3\.5 h-3\.5" \/>\s*Sabujhasan465@gmail\.com\s*<\/a>/,
  `<ProtectedEmailLink className="$1">\n              <Mail className="w-3.5 h-3.5" />\n              <ProtectedEmail />\n            </ProtectedEmailLink>`
);

// 2. Line 1358
content = content.replace(
  /<span className="font-bold text-slate-800 text-sm">\s*Sabujhasan465@gmail\.com\s*<\/span>/,
  `<ProtectedEmail className="font-bold text-slate-800 text-sm" />`
);
content = content.replace(
  /<a href="mailto:Sabujhasan465@gmail\.com" className="text-\[11px\] text-blue-600 hover:underline mt-1 block">([\s\S]*?)<\/a>/,
  `<ProtectedEmailLink className="text-[11px] text-blue-600 hover:underline mt-1 block">$1</ProtectedEmailLink>`
);

// 3. Line 1536
content = content.replace(
  /<span className="font-extrabold text-blue-400">Sabujhasan465@gmail\.com<\/span>/,
  `<ProtectedEmail className="font-extrabold text-blue-400" />`
);

// 4. Line 1574
content = content.replace(
  /Secondhand items trade registry under Sabujhasan465@gmail\.com\. Serving Madina Holy District\./,
  `Secondhand items trade registry under <ProtectedEmail className="inline" />. Serving Madina Holy District.`
);

// Fallback for any remaining Sabujhasan465@gmail.com
// Wait, replacing string literals inside ternary or strings might break syntax.
// Let's use it as is.
fs.writeFileSync('src/app/page.tsx', content);
console.log('Done');
