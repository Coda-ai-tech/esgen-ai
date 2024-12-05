import type { Viewport } from 'next';
import { ConfigContextProvider } from '@/context/config.context';
import { Locale } from '@/app/i18n.config';
import { DataTypeProps } from '@/types';
import { GetPageData } from '@/hook/useFetchData';
import GlobalConfig from '@/components/GlobalConfig';
import MainWrapper from '@/components/MainWrapper';
import '@/styles/global.scss';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const lang = (await params).lang as Locale;
  const globalData = await GetPageData(DataTypeProps.test, [lang, 'global']);

  return (
    <html lang={lang}>
      {globalData && (
        <>
          <link rel='icon' href={globalData.favIcon ? globalData.favIcon : '/assets/favicon.ico'} sizes='any' />
          <body>
            <ConfigContextProvider>
              <GlobalConfig data={globalData} />
              <MainWrapper>{children}</MainWrapper>
            </ConfigContextProvider>
          </body>
        </>
      )}
    </html>
  );
}
