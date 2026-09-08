import type { Metadata } from 'next';
import Script from 'next/script';
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
    'second hand furniture madina'
  ],
  authors: [
    { name: 'asifulmamun', url: 'https://asifulmamun.info.bd' }
  ],
  creator: 'asifulmamun',
  publisher: 'Used Furniture Buyer Madinah',
  metadataBase: new URL('https://usedfurniturebuyermadinah.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'شراء الاثاث المستعمل بالمدينة المنورة',
    description: 'نشتري الاثاث المستعمل بالمدينة المنورة بأفضل الأسعار. تقييم عادل ودفع كاش فوري، مع الفك والتحميل مجاناً.',
    url: 'https://usedfurniturebuyermadinah.com',
    siteName: 'شراء الاثاث المستعمل بالمدينة المنورة',
    images: [
      {
        url: '/madina/cover.jpeg',
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
    images: ['/madina/cover.jpeg'],
  },
  icons: {
    icon: '/madina/logo.jpeg',
    shortcut: '/madina/logo.jpeg',
    apple: '/madina/logo.jpeg',
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-B9ZRDBHMN3"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-B9ZRDBHMN3');
          `}
        </Script>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5VR29DTQ');
          `}
        </Script>
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
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5VR29DTQ"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
            title="Google Tag Manager"
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
