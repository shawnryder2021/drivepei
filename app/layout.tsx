import type { Metadata } from 'next';
import Script from 'next/script';
import { Header, Footer } from '@/components/Header';
import { AttributionCapture } from '@/components/AttributionCapture';
import { CompareTray } from '@/components/CompareTray';
import './globals.css';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://drivepei.ca';
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  verification: {
    google: 'ILYPw0m7CJwbrEOgya6sPXJfW1U4c9RzRz_EXwdlQUs',
    other: { 'msvalidate.01': '5723961F34730A98D3BE3B7EC9DE50D3' },
  },
  title: {
    default: 'DrivePEI | Used Cars & Financing in Prince Edward Island',
    template: '%s | DrivePEI',
  },
  icons: { icon: '/favicon.svg' },
  description:
    'Explore quality used vehicles of many makes in PEI. Search current inventory, find flexible financing options, and make your next move with confidence.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'DrivePEI',
    description:
      'Cars. Credit. Confidence. Find your next drive on Prince Edward Island.',
    siteName: 'DrivePEI',
    type: 'website',
    images: [{ url: '/images/pei-coastal-drive.webp' }],
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gtm = process.env.NEXT_PUBLIC_GTM_ID;
  return (
    <html lang="en-CA">
      <head>
        <script
          data-host="https://shawnryder.site"
          data-dnt="false"
          src="https://shawnryder.site/js/script.js"
          id="ZwSg9rf6GA"
          async
          defer
        />
      </head>
      <body>
        <AttributionCapture />
        {gtm && (
          <Script
            id="gtm"
            strategy="afterInteractive"
          >{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm}');`}</Script>
        )}
        <Header />
        {children}
        <CompareTray />
        <Footer />
      </body>
    </html>
  );
}
