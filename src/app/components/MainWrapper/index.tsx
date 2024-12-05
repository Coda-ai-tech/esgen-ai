'use client';
import { useContext } from 'react';
import { ConfigContext } from '@/context/config.context';
import styles from './MainWrapper.module.scss';

const MainWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isNoticeBarShow } = useContext(ConfigContext);

  return <main className={`${styles.mainWrapper} ${isNoticeBarShow ? styles.showNoticeBar : ''}`}>{children}</main>;
};

export default MainWrapper;
