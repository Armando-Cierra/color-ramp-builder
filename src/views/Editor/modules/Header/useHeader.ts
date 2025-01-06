import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { EditorContext } from '../../context';
import { AppContextProps, EditorContextProps } from '@/types';
import { AppContext } from '@/context';
import { toast } from 'react-toastify';

export const useHeader = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const colorRampID = location.state;
  const editorType = location.state ? 'edit' : 'new';

  const {
    colorRamp,
    colorRamp: { name: colorRampName },
    actions: { changeName: changeColorRampName },
  } = useContext(EditorContext) as EditorContextProps;

  const { addColorRamp, colorRamps } = useContext(
    AppContext,
  ) as AppContextProps;

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

  const saveColorRampChanges = () => {
    const updatedColorRamps = colorRamps;
    const updatedColorRampIndex = updatedColorRamps.findIndex(
      (colorRamp) => colorRamp.id === colorRampID,
    );

    updatedColorRamps[updatedColorRampIndex] = colorRamp;
    localStorage.setItem('colorRamps', JSON.stringify(updatedColorRamps));
    navigate('/');
  };

  const saveColorRamp = () => {
    const savedColorRamps = localStorage.getItem('colorRamps');
    if (savedColorRamps) {
      const parsedSavedColorRamps = JSON.parse(savedColorRamps);
      const updatedSavedColorRamps = [...parsedSavedColorRamps, colorRamp];
      localStorage.setItem(
        'colorRamps',
        JSON.stringify(updatedSavedColorRamps),
      );
    } else {
      localStorage.setItem('colorRamps', JSON.stringify([colorRamp]));
    }

    addColorRamp(colorRamp);
    toast(t('general.colorRampSaved'));
    navigate('/');
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
    navigate,
    saveColorRamp,
    editorType,
    saveColorRampChanges,
  };
};
