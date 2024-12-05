'use client';
import { createContext, useState } from 'react';

export const ConfigContext = createContext<{
  globalData: any;
  setGlobalData: Function;
  dictionary: any;
  setDictionary: Function;
  screen: string | null;
  setScreen: Function;
  screenList: string | null;
  setScreenList: Function;
  isNoticeBarShow: boolean;
  setNoticeBarShow: Function;
  isNavShow: boolean;
  setNavShow: Function;
}>({
  globalData: null,
  setGlobalData: () => {},
  dictionary: null,
  setDictionary: () => {},
  screen: null,
  setScreen: () => '',
  screenList: null,
  setScreenList: () => '',
  isNoticeBarShow: false,
  setNoticeBarShow: () => '',
  isNavShow: false,
  setNavShow: () => '',
});

export const ConfigContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [globalData, setGlobalData] = useState<any>(null);
  const [dictionary, setDictionary] = useState<any>(null);
  const [screen, setScreen] = useState<string | null>(null);
  const [screenList, setScreenList] = useState<string | null>(null);
  const [isNoticeBarShow, setNoticeBarShow] = useState<boolean>(false);
  const [isNavShow, setNavShow] = useState<boolean>(false);

  return (
    <ConfigContext.Provider
      value={{
        globalData,
        setGlobalData,
        dictionary,
        setDictionary,
        screen,
        setScreen,
        screenList,
        setScreenList,
        isNoticeBarShow,
        setNoticeBarShow,
        isNavShow,
        setNavShow,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};
