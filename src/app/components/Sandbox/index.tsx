'use client';
import dynamic from 'next/dynamic';
import { useContext } from 'react';
import { ConfigContext } from '@/context/config.context';
import { useParams } from 'next/navigation';
import { ModuleData, ButtonElement, ButtonVariantion, ButtonColor, ButtonAction, MediaElement } from '@/types';
import { IconList } from '@/types/icons';
import { MatchMedia, BreakePoint, MatchMediaType } from '@/hook/useBreakPoint';
import styles from './Sandbox.module.scss';

// Set Nessasary Components
const SvgIcon = dynamic(() => import('@/components/SvgIcon'), { ssr: false });
const Button = dynamic(() => import('@/components/Button'), { ssr: false });

interface SandboxProps {
  title: string;
  description: string;
  cta: ButtonElement<IconList>[];
  media: MediaElement;
}

interface ModuleOptionProps {
  isDark: boolean;
}

const Sandbox = ({ order, data }: ModuleData<SandboxProps, ModuleOptionProps>) => {
  const { lang } = useParams();
  const { screen, dictionary } = useContext(ConfigContext);

  const {
    id,
    content: { title, description, cta },
    moduleOption: { isDark },
  } = data;

  const customCta: ButtonElement<IconList> = {
    label: dictionary?.button?.submit,
    variant: ButtonVariantion.contain,
    color: ButtonColor.secondary,
    icon: null,
    link: {
      type: ButtonAction.callback,
      href: null,
    },
    callback: () => {
      alert('Custom Callback');
    },
  };

  return (
    <section id={id ? id : `section${order}`} className={`${styles.moduleSandbox} ${isDark && styles.themeDark}`}>
      <div className={`${styles.inner}`}>
        <div className={`${styles.head}`}>
          {order === 0 ? <h1 className={styles.title}>{title}</h1> : <h2 className={styles.title}>{title}</h2>}
          <p className={styles.description}>{description}</p>
        </div>
        <div className={`${styles.body}`}>
          <article>
            <div className={`${styles.info}`}>
              <ul>
                <li> Screen: {screen}</li>
                <li> Order: {order}</li>
                <li> Module ID: {data.module}</li>
                <li> Language: {lang}</li>
              </ul>
            </div>
          </article>

          <article>
            <h4>SvgIcon</h4>
            <div className={`${styles.iconWrap}`}>
              <div className={`${styles.icon}`}>
                <SvgIcon name='like' />
              </div>
            </div>
          </article>

          <article>
            <h4>Responsive</h4>
            <ul>
              {MatchMedia(BreakePoint.lg) && <li> Under BreakePoint.lg Showing Content (Default maxWidth)</li>}
              {MatchMedia(BreakePoint.lg, MatchMediaType.minWidth) && <li> Over BreakePoint.lg Showing Content</li>}
              {MatchMedia(BreakePoint.lg, MatchMediaType.only) && <li> Only BreakePoint.lg Showing Content</li>}
            </ul>
          </article>

          <article>
            <h4>Button</h4>
            <div className={`${styles.btnWrap}`}>
              {cta?.map((item: ButtonElement<IconList>, index: number) => {
                return <Button key={index} content={item} />;
              })}
              <Button content={customCta} />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Sandbox;
