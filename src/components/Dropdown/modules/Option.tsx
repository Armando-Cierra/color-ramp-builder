import classNames from 'classnames';
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode;
  isSelected?: boolean;
}

export const Option = ({ children, isSelected, ...rest }: Props) => {
  return (
    <button
      className={classNames('dropdown_menu_option', {
        'dropdown_menu_option--isSelected': isSelected,
      })}
      {...rest}
    >
      {children}
    </button>
  );
};
