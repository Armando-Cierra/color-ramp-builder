import { ReactNode } from 'react';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { Toolbar } from '@/components';
import './template.scss';

interface Props {
  children: ReactNode;
}

export const Template = ({ children }: Props) => {
  const { pathname } = useLocation();

  return (
    <>
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
