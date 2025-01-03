import { ReactNode } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { IconAlertTriangle } from '@tabler/icons-react';
import { Toolbar } from '@/components';
import './template.scss';

interface Props {
  children: ReactNode;
}

export const Template = ({ children }: Props) => {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  return (
    <>
      <div className="resolutionWarning">
        <div className="resolutionWarningContainer">
          <IconAlertTriangle />
          <p>{t('general.resolution')}</p>
        </div>
      </div>
      <div
        className={classNames('template', {
          'template--home': pathname === '/' || pathname === '/home',
        })}
      >
        <Toolbar />
        <main className="template_mainBox">{children}</main>
      </div>
    </>
  );
};
