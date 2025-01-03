import {
  Children,
  isValidElement,
  KeyboardEvent,
  ReactElement,
  ReactNode,
  useState,
} from 'react';
import { Option } from './modules';

export const useDropdown = (children: ReactNode) => {
  const childrenArray = Children.toArray(children);
  let options: ReactElement[] = [];

  childrenArray.forEach((item) => {
    if (isValidElement(item) && item.type === Option)
      options = [...options, item];
  });

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') closeDropdown();
  };

  return {
    options,
    isOpen,
    toggleDropdown,
    closeDropdown,
    handleKeyDown,
  };
};
