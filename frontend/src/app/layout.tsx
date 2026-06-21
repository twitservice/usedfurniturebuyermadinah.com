import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'شراء الاثاث المستعمل بالمدينة المنورة | اتصل الآن 0579068424',
  description: 'نشتري الاثاث المستعمل بالمدينة المنورة بأفضل الأسعار. غرف نوم، مكيفات، مجالس، أجهزة كهربائية ومطابخ مع التفكيك والنقل مجاناً.',
  keywords: [
    'شراء الاثاث المستعمل',
    'الاثاث المستعمل بالمدينة المنورة',
    'شراء مكيفات مستعملة المدينة',
    'شراء غرف نوم مستعملة',
    'used furniture buyer madinah',
    'buy used furniture',
    'MD Sabuj Miah',
    'second hand furniture madina'
  ],
  authors: [
    { name: 'asifulmamun', url: 'https://asifulmamun.info.bd' }
  ],
  creator: 'asifulmamun',
  publisher: 'MD Sabuj Miah Trading',
  metadataBase: new URL('https://usedfurniturebuyermadinah.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'شراء الاثاث المستعمل بالمدينة المنورة | MD Sabuj Miah',
    description: 'نشتري الاثاث المستعمل بالمدينة المنورة بأفضل الأسعار. تقييم عادل ودفع كاش فوري، مع الفك والتحميل مجاناً.',
    url: 'https://usedfurniturebuyermadinah.com',
    siteName: 'شراء الاثاث المستعمل بالمدينة المنورة',
    images: [
      {
        url: '/madina/buy-furniture-from-madinah-50b20875-a17e-425a-ad7a-3f0c7259f65c.jpeg',
        width: 1200,
        height: 630,
        alt: 'شراء الاثاث المستعمل بالمدينة المنورة',
      },
    ],
    locale: 'ar_SA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'شراء الاثاث المستعمل بالمدينة المنورة',
    description: 'نشتري الاثاث المستعمل بالمدينة المنورة بأفضل الأسعار كاش',
    images: ['/madina/buy-furniture-from-madinah-50b20875-a17e-425a-ad7a-3f0c7259f65c.jpeg'],
  },
  icons: {
    icon: '/madina/buy-furniture-from-madinah-logo.jpeg',
    shortcut: '/madina/buy-furniture-from-madinah-logo.jpeg',
    apple: '/madina/buy-furniture-from-madinah-logo.jpeg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" suppressHydrationWarning>
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
      <body suppressHydrationWarning className="bg-slate-50 text-slate-800 antialiased overflow-x-hidden selection:bg-amber-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
