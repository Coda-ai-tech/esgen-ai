'use client';
import { useEffect, useContext } from 'react';
import { ConfigContext } from '@/context/config.context';
import { SetBreakPoint } from '@/hook/useBreakPoint';
import { useRouter } from 'next/navigation';

export interface GlobalDataProps {
  dictionary: Record<string, any>;
}

const GlobalConfig = ({ data }: { data: GlobalDataProps }) => {
  // For Production...
  // Prevent rederling if not from iFrame
  const route = useRouter();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const REQUIRE_IFRAME = process.env.NEXT_PUBLIC_REQUIRE_IFRAME === 'true';
      const inIframe = () => window.self !== window.top;
      if (inIframe()) {
        document.body.classList.add('inIframe');
      } else {
        document.body.classList.add('noIframe');
        // Do not redirect away by default; allow standalone rendering.
        // If a hard requirement is desired, enable NEXT_PUBLIC_REQUIRE_IFRAME=true
        if (REQUIRE_IFRAME) {
          try {
            window.location.href = '/';
          } catch {}
        }
      }
    }
  }, [route]);

  useEffect(() => {
    const receiveMessage = async (event: any) => {
      // console.log('in Chatbot App', event);
      await fetch(`/api/verify`, {
        method: 'POST',
        body: JSON.stringify({
          host: event.origin,
          key: event.data,
        }),
      }).then((res) => {
        if (res.status === 200) {
          // verified
          return;
        }
        // If verification fails, do not hard redirect in standalone mode
        // This avoids blank pages when not embedded via launcher
      });
    };

    window.addEventListener('message', receiveMessage, false);
    return () => {
      window.removeEventListener('message', receiveMessage);
    };
  }, [route]);

  SetBreakPoint();
  const { dictionary } = data;
  const { setDictionary } = useContext(ConfigContext);

  useEffect(() => {
    setDictionary(dictionary);
  }, [dictionary, setDictionary]);

  return <></>;
};

export default GlobalConfig;
