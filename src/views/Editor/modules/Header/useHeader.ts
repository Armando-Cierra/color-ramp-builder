import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EditorContext } from '../../context';
import { EditorContextProps } from '@/types';

export const useHeader = () => {
  const { t } = useTranslation();
  const {
    colorRamp: { name: colorRampName },
    actions: { changeName: changeColorRampName },
  } = useContext(EditorContext) as EditorContextProps;

  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(colorRampName);

  const openModal = () => setIsOpen(true);

  const closeModal = () => {
    setValue(colorRampName);
    setIsOpen(false);
  };

  const changeValue = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value !== colorRampName) {
      changeColorRampName(value);
    }

    setIsOpen(false);
  };

  useEffect(() => {
    setValue(colorRampName);
  }, [isOpen, colorRampName]);

  return {
    t,
    colorRampName,
    changeColorRampName,
    isOpen,
    value,
    openModal,
    closeModal,
    handleSubmit,
    changeValue,
  };
};
