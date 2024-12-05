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
      const inIframe = () => window.self !== window.top;
      if (inIframe()) {
        document.body.classList.add('inIframe');
      } else {
        document.body.classList.add('noIframe');
        return route.push('https://google.com');
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
          // Do nothing...
          console.log(res);
        } else {
          return route.push('https://google.com');
        }
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
