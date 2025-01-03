import { useState, useContext, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { EditorContext } from '../../context';
import { EditorContextProps } from '@/types';

export const useSettings = () => {
  const { t } = useTranslation();
  const {
    colorRamp: { steps, interpolationMode },
    actions: {
      changeSteps,
      // changeInterpolationMode
    },
  } = useContext(EditorContext) as EditorContextProps;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [inlineNotificationIsVisible, setInlineNotificationIsVisible] =
    useState(true);
  const [checkbox, setCheckbox] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const inlineNotificationIsHidden = JSON.parse(
    localStorage.getItem('hideInlineNotification') ?? 'false',
  );

  const interpolationModes = ['lab', 'rgb', 'lrgb', 'hsl', 'lch'];

  const increaseSteps = () => {
    steps < 15 && changeSteps(steps + 1);
  };

  const decreaseSteps = () => {
    steps > 0 && changeSteps(steps - 1);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    if (Number.isInteger(value) && value >= 0 && value <= 15) {
      changeSteps(value);
    }
  };

  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setCheckbox(checked);
  };

  const modalActions = (action: 'yes' | 'no' | 'cancel') => () => {
    switch (action) {
      case 'yes':
        setInlineNotificationIsVisible(false);
        if (checkbox) {
          localStorage.setItem('hideInlineNotification', 'true');
        } else {
          localStorage.setItem('hideInlineNotification', 'false');
        }
        closeModal();
        break;
      case 'no':
        setInlineNotificationIsVisible(true);
        closeModal();
        break;
      case 'cancel':
        closeModal();
        break;
    }
  };

  return {
    t,
    modalIsOpen,
    inlineNotificationIsHidden,
    openModal,
    closeModal,
    modalActions,
    interpolationModes,
    steps,
    interpolationMode,
    increaseSteps,
    decreaseSteps,
    handleChange,
    handleCheckbox,
    inlineNotificationIsVisible,
  };
};
