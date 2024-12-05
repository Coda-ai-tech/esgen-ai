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
  const { lang, slug } = await params;
  return GetPageMeta(dataType, [lang, ...slug]);
};

const DynamicPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ lang: Locale; slug: string[] }>;
  searchParams?: Promise<{ [key: string]: string }>;
}) => {
  const { lang, slug } = await params;
  const pageData = await GetPageData(dataType, [lang, ...slug], '', await searchParams);
  return <>{GetModule(pageData)}</>;
};

export default DynamicPage;
