'use client';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { ButtonElement, ButtonAction, ButtonSize, ButtonColor, ButtonIconPosition } from '@/types';
import { IconList } from '@/components/SvgIcon';
import Link from 'next/link';
import styles from './Button.module.scss';

// Set Nessasary Components
const SvgIcon = dynamic(() => import('@/components/SvgIcon'), { ssr: false });

const ButtonIcon = ({ name }: { name: IconList }) => {
  return (
    <div className={`${styles.buttonIconWrap}`}>
      <SvgIcon name={name} />
    </div>
  );
};

const Button = ({
  content,
  size = ButtonSize.md,
  className,
  isDisabled = false,
  ref,
  isLoading = false,
}: {
  content: ButtonElement<IconList>;
  size?: ButtonSize;
  className?: string;
  isDisabled?: boolean;
  ref?: any;
  isLoading?: boolean;
}) => {
  const { label, variant, color, icon, link, callback, callBackData } = content;
  const { lang } = useParams();

  const onClickHandler = () => {
    if (!callback) return;
    if (callBackData) {
      console.log(callBackData);
    }
    callback();
  };

  if (!link || !link.type) {
    return <>Empty Link Data</>;
  }

  return (
    <>
      {(link.type === ButtonAction.external ||
        link.type === ButtonAction.routeLink ||
        link.type === ButtonAction.newWindow) && (
        <Link
          href={`${link.href}`}
          className={`${styles.btn} ${styles[lang as string]} ${styles[size]} ${styles[color || ButtonColor.primary]} ${
            className ? className : ''
          } ${variant ? styles[variant] : ''} ${icon ? styles.hasIcon : ''} ${
            icon?.position === ButtonIconPosition.left ? styles.iconLeft : styles.iconRight
          } ${isDisabled ? styles.disabled : ''}`}
          target={link.type === ButtonAction.external || link.type === ButtonAction.newWindow ? '_blank' : undefined}
          aria-label={label}
        >
          {label && <span className={styles.btnLabel}>{label}</span>}
          {icon && <ButtonIcon name={icon.name} />}
        </Link>
      )}

      {link.type === ButtonAction.callback && (
        <button
          ref={ref}
          className={`${styles.btn} ${styles[lang as string]} ${styles[size]} ${styles[color || ButtonColor.primary]} ${
            className ? className : ''
          } ${variant ? styles[variant] : ''} ${icon ? styles.hasIcon : ''} ${
            icon?.position === ButtonIconPosition.left ? styles.iconLeft : styles.iconRight
          } ${isDisabled ? styles.disabled : ''}`}
          onClick={(e) => {
            e.preventDefault();

            if (link.type === ButtonAction.callback) {
              onClickHandler();
            }
          }}
          aria-label={label}
        >
          {label && <span className={styles.btnLabel}>{label}</span>}
          {icon && <ButtonIcon name={icon.name} />}
        </button>
      )}

      {link.type === ButtonAction.submit && (
        <button
          className={`${styles.btn} ${styles[lang as string]} ${className ? className : ''} ${styles[size]} ${
            styles[color || ButtonColor.primary]
          } ${variant ? styles[variant] : ''} ${icon ? styles.hasIcon : ''} ${
            isDisabled || isLoading ? styles.disabled : ''
          }`}
          onClick={() => {
            onClickHandler();
          }}
          aria-label={label}
          type='submit'
        >
          {label && <span className={styles.btnLabel}>{label}</span>}
          {icon && <ButtonIcon name={icon.name} />}
        </button>
      )}
    </>
  );
};

export default Button;
