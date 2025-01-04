import { ChangeEvent, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import chroma from 'chroma-js';
import { EditorContext } from '../../context';
import { ColorRampColorPosition, EditorContextProps } from '@/types';

interface ColorPickersConfig {
  position: ColorRampColorPosition;
  label: string;
  color: string | undefined;
  value: string | undefined;
  isDisabled: boolean;
  showButtons: boolean;
}

export const useMainColors = () => {
  const { t } = useTranslation();

  // Context
  const {
    colorRamp: {
      colors: { extremeLeft, central, extremeRight },
    },
    actions: { changeColor },
  } = useContext(EditorContext) as EditorContextProps;

  // States
  const [colorValues, setColorValues] = useState({
    extremeLeft,
    central,
    extremeRight,
  });

  // Actions
  const handleColorPicker =
    (position: ColorRampColorPosition) => (color: string) => {
      changeColor(position, color);
      setColorValues((prevState) => ({
        ...prevState,
        [position]: color,
      }));
    };

  const handleManualColorChange =
    (position: ColorRampColorPosition) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setColorValues((prevState) => ({
        ...prevState,
        [position]: value,
      }));

      if (chroma.valid(value)) {
        changeColor(position, chroma(value).hex());
        setColorValues((prevState) => ({
          ...prevState,
          [position]: chroma(value).hex(),
        }));
      }
    };

  const toggleSwitch = (state: 'active' | 'inactive') => () => {
    if (state === 'active') {
      changeColor('central', colorValues.central ?? '#ffffff');
      setColorValues((prevState) => ({
        ...prevState,
        central: '#ffffff',
      }));
    } else {
      changeColor('central', undefined);
      setColorValues((prevState) => ({
        ...prevState,
        central: '-',
      }));
    }
  };

  // Color Pickers Config
  const colorPickersConfig: ColorPickersConfig[] = [
    {
      position: 'extremeLeft',
      label: t('editor.mainColors.extremeLeft'),
      color: extremeLeft,
      value: colorValues.extremeLeft,
      isDisabled: false,
      showButtons: false,
    },
    {
      position: 'central',
      label: t('editor.mainColors.central'),
      color: central ?? '#ffffff',
      value: colorValues.central ?? '-',
      isDisabled: central === undefined,
      showButtons: true,
    },
    {
      position: 'extremeRight',
      label: t('editor.mainColors.extremeRight'),
      color: extremeRight,
      value: colorValues.extremeRight,
      isDisabled: false,
      showButtons: false,
    },
  ];

  return {
    t,
    handleManualColorChange,
    central,
    handleColorPicker,
    colorPickersConfig,
    toggleSwitch,
  };
};
