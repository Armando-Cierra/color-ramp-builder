import { useState, useContext, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { recalculateStepsPercentages } from '@/utils';
import { EditorContext } from '../../context';
import { EditorContextProps, InterpolationModes } from '@/types';

export const useSettings = () => {
  const { t } = useTranslation();

  // Context
  const {
    colorRamp: { steps, interpolationMode: selectedInterpolationMode },
    actions: { changeSteps, changeInterpolationMode, changePercentagesAmount },
  } = useContext(EditorContext) as EditorContextProps;

  // States
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [inlineNotificationIsVisible, setInlineNotificationIsVisible] =
    useState(true);
  const [checkbox, setCheckbox] = useState(false);

  // Actions
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const inlineNotificationIsHidden = JSON.parse(
    localStorage.getItem('hideInlineNotification') ?? 'false',
  );

  const interpolationModes = ['lab', 'rgb', 'lrgb', 'hsl', 'lch'];

  const increaseSteps = () => {
    if (steps < 15) {
      const newAmount = steps + 1;
      changeSteps(newAmount);
      changePercentagesAmount(recalculateStepsPercentages(newAmount));
    }
  };

  const decreaseSteps = () => {
    if (steps < 15) {
      const newAmount = steps - 1;
      changeSteps(newAmount);
      changePercentagesAmount(recalculateStepsPercentages(newAmount));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    if (Number.isInteger(value) && value >= 0 && value <= 15) {
      changeSteps(value);
      changePercentagesAmount(recalculateStepsPercentages(value));
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

  const selectInterpolationMode = (mode: InterpolationModes) => () => {
    changeInterpolationMode(mode);
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
    selectedInterpolationMode,
    increaseSteps,
    decreaseSteps,
    handleChange,
    handleCheckbox,
    inlineNotificationIsVisible,
    selectInterpolationMode,
  };
};
