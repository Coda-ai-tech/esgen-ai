import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { i18n } from '@/app/i18n.config';
import { DataTypeProps } from '@/types';

const {
  NEXT_PUBLIC_DEV_API_ENDPOINT_SUFFIXE,
  NEXT_PUBLIC_DEV_LOCAL_API_ENDPOINT,
  NEXT_PUBLIC_DEV_PREV_API_ENDPOINT,
  NEXT_PUBLIC_SITE_ENDPOINT,
} = process.env;

const endpointPrefixList = {
  // Fallback to '/api' so public JSON like /api/en/home.json works on Netlify
  test: NEXT_PUBLIC_DEV_API_ENDPOINT_SUFFIXE || '/api',
};

const exceptionCase = (slug: string[]) => {
  if (/api|assets|favicon.ico|sw.js|turbopack|__nextjs_original-stack-frame/.test(slug[0]) || slug === undefined) {
    return true;
  }
  return;
};

export const GetPageData = async (dataType: DataTypeProps, slug: string[], from?: string, searchParams?: any) => {
  if (exceptionCase(slug)) return;

  if (from) {
    // ? Where calling function
    console.log('from', from);
  }

  if (searchParams != undefined && Object.getOwnPropertyNames(searchParams).length > 0) {
    // ? if has searchParams
    console.log('searchParams', searchParams);
  }

  const endpoint = `${endpointPrefixList[dataType as keyof typeof endpointPrefixList]}/${slug.join('/')}.json`;

  try {
    const basePrefix =
      process.env.NODE_ENV === 'production'
        ? (NEXT_PUBLIC_DEV_PREV_API_ENDPOINT || '')
        : (NEXT_PUBLIC_DEV_LOCAL_API_ENDPOINT || '');

    // Ensure leading slash for same-origin relative fetches
    const url = `${basePrefix}${endpoint}`.startsWith('/') ? `${basePrefix}${endpoint}` : `/${basePrefix}${endpoint}`;

    const response = await fetch(url.replace(/\/\/+/, '/'));
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(
      `==== TEST DATA NOT FOUND (${
        process.env.NODE_ENV === 'production' ? NEXT_PUBLIC_DEV_PREV_API_ENDPOINT : NEXT_PUBLIC_DEV_LOCAL_API_ENDPOINT
      }${endpoint}) ====`
    );
    console.error(error);
    return notFound();
  }
};

export const GetPageMeta = async (dataType: DataTypeProps, slug: string[]) => {
  if (exceptionCase(slug)) {
    return {
      title: null,
    };
  } else {
    try {
      const data = await GetPageData(dataType, slug, 'Get Meta');
      const {
        meta: { title, description, keywords, ogImage: images },
      } = data;

      const headersList = await headers();
      const pathname = headersList.get('x-forwarded-pathname');

      const getLanguages = () => {
        const locales: any = {};
        for (let i = 0; i < i18n.locales.length; i++) {
          locales[i18n.locales[i]] = `/${i18n.locales[i]}`;
        }
        return locales;
      };

      return {
        metadataBase: new URL((NEXT_PUBLIC_SITE_ENDPOINT as string) || 'http://localhost'),
        title,
        description,
        keywords,
        alternates: {
          canonical: `/${slug.join('/')}`,
          languages: getLanguages(),
        },
        openGraph: {
          title,
          description,
          images,
          type: `website`,
          url: `${pathname}`,
        },
      };
    } catch (error) {
      console.log('Meta data not found', error);
      return notFound();
    }
  }
};
