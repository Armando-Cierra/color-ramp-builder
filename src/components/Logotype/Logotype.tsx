import classNames from 'classnames';
import LightLogo from '@/assets/light-logo.svg';
import DarkLogo from '@/assets/dark-logo.svg';
import './logotype.scss';
import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

interface Props
  extends DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  isDetached?: boolean;
  isOnMac?: boolean;
  theme: 'light' | 'dark' | 'auto';
  onClick?: () => void;
}

export const Logotype = ({
  isDetached,
  isOnMac,
  theme,
  onClick,
  ...rest
}: Props) => {
  const systemPreference = window.matchMedia('(prefers-color-scheme: light)');
  const currentTheme =
    theme === 'auto' ? (systemPreference.matches ? 'light' : 'dark') : theme;

  return (
    <>
      {currentTheme === 'light' ? (
        <img
          className={classNames('logotype', {
            'logotype--isDetached': isDetached,
            'logotype--isOnMac': isOnMac,
          })}
          src={LightLogo}
          alt="Light Color Ramp Builder Logo"
          onClick={onClick}
          {...rest}
        />
      ) : (
        <img
          className={classNames('logotype', {
            'logotype--isDetached': isDetached,
            'logotype--isOnMac': isOnMac,
          })}
          src={DarkLogo}
          alt="Light Color Ramp Builder Logo"
          onClick={onClick}
          {...rest}
        />
      )}
    </>
  );
};
