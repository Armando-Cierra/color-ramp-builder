import { ChangeEvent, KeyboardEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppContext } from '@/context';
import { AppContextProps } from '@/types';

export const useSavedThemes = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { colorRamps, removeColorRamp } = useContext(
    AppContext,
  ) as AppContextProps;

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedColorRamp, setSelectedColorRamp] = useState('');
  const [filter, setFilter] = useState('');

  const openModal =
    (id: string) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();
      setSelectedColorRamp(id);
      setModalIsOpen(true);
    };
  const closeModal = () => {
    setSelectedColorRamp('');
    setModalIsOpen(false);
  };

  const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const filteredColorRamps =
    filter !== ''
      ? colorRamps.filter((item) => {
          return item.name.toLowerCase().includes(filter.toLowerCase());
        })
      : colorRamps;

  const deleteColorRamp = () => {
    removeColorRamp(selectedColorRamp);
    closeModal();
  };

  const goToHome = () => navigate(-1);

  const goToEditor = () => navigate('/editor');

  const goToColorRamp = (id: string) => () =>
    navigate(`/editor`, { state: id });

  const spaceKeyEvent = (id: string) => (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.code === 'Space' && (e.target as HTMLElement).tagName !== 'BUTTON') {
      e.preventDefault();
      goToColorRamp(id)();
    }
  };

  return {
    t,
    goToHome,
    goToEditor,
    goToColorRamp,
    modalIsOpen,
    openModal,
    closeModal,
    deleteColorRamp,
    selectedColorRamp,
    filteredColorRamps,
    handleFilter,
    filter,
    spaceKeyEvent,
  };
};
