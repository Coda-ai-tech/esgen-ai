import type { Metadata } from 'next';
import { DataTypeProps } from '@/types';
import { Locale } from '@/app/i18n.config';
import { GetPageData, GetPageMeta } from '@/hook/useFetchData';
import { GetModule } from '@/hook/useGetModules';

const dataType = DataTypeProps.test;

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string[] }>;
}): Promise<Metadata> => {
  const { lang } = await params;
  return GetPageMeta(dataType, [lang, 'home']);
};

const HomePage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ lang: Locale }>;
  searchParams?: Promise<{ [key: string]: string }>;
}) => {
  try {
    const { lang } = await params;
    const pageData = await GetPageData(dataType, [lang, 'home'], '', await searchParams);
    return <>{GetModule(pageData)}</>;
  } catch (error) {
    console.error('HomePage error:', error);
    // Fallback UI
    return <section>Loading ESGEN...</section>;
  }
};

export default HomePage;
