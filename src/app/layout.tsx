import type { Metadata } from 'next';
import '@/styles/global.scss';

export const metadata: Metadata = {
  title: 'ESGEN - AI-Generated ESG Reports',
  description: 'Generate ESG reports in minutes with AI assistance',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/favicon.ico" sizes="any" />
      </head>
      <body>{children}</body>
    </html>
  );
}
