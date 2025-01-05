import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';
import FocusLock from 'react-focus-lock';
import OutsideClickHandler from 'react-outside-click-handler';
import { IconChevronDown } from '@tabler/icons-react';
import { Option } from './modules';
import { useDropdown } from './useDropdown';
import './dropdown.scss';

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  value: string;
  children: ReactNode;
}

export const Dropdown = Object.assign(
  ({ className: customClassName, children, value, ...rest }: Props) => {
    const { options, isOpen, toggleDropdown, closeDropdown, handleKeyDown } =
      useDropdown(children);

    return (
      <OutsideClickHandler onOutsideClick={closeDropdown}>
        <div
          className={classNames('dropdown', {
            [customClassName as string]: customClassName,
          })}
          {...rest}
        >
          <button className="dropdown_box" onClick={toggleDropdown}>
            <span>{value}</span>
            <IconChevronDown />
          </button>
          {isOpen && (
            <FocusLock>
              <div className="drodpwn_menu" onKeyDown={handleKeyDown}>
                {options}
              </div>
            </FocusLock>
          )}
        </div>
      </OutsideClickHandler>
    );
  },
  {
    Option,
  },
);
