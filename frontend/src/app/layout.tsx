import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'شراء الاثاث المستعمل بالمدينة المنورة | اتصل الآن 0579068424',
  description: 'نشتري الاثاث المستعمل بالمدينة المنورة بأفضل الأسعار. غرف نوم، مكيفات، مجالس، أجهزة كهربائية ومطابخ مع التفكيك والنقل مجاناً.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: `
          body {
            font-family: 'Cairo', 'Plus Jakarta Sans', sans-serif;
          }
        `}} />
      </head>
      <body className="bg-slate-50 text-slate-800 antialiased overflow-x-hidden selection:bg-amber-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
