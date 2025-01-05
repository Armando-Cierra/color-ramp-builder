import { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { getColorRamp, colorFormat } from '@/utils';
import { EditorContext } from '../../context';
import { ColorFormats, EditorContextProps } from '@/types';
import { Slide, toast } from 'react-toastify';

export const useResults = () => {
  const { t } = useTranslation();

  const [selectedColorFormat, setSelectedColorFormat] =
    useState<ColorFormats>('hex');

  const colorFormats = ['hex', 'rgb', 'hsl'];

  const {
    colorRamp: { percentages, colors, interpolationMode },
  } = useContext(EditorContext) as EditorContextProps;

  const colorRamp = getColorRamp(colors, interpolationMode, percentages);

  const changeColorFormat = (newColorFormat: ColorFormats) =>
    setSelectedColorFormat(newColorFormat);

  const handleCopy = () => {
    const formattedColorRamp: string[] = [];

    colorRamp.forEach((color) => {
      formattedColorRamp.push(colorFormat(color, selectedColorFormat));
    });

    navigator.clipboard.writeText(formattedColorRamp.join('\n')).then(() => {
      toast(t('editor.results.copied'), {
        position: 'bottom-center',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'colored',
        transition: Slide,
      });
    });
  };

  return {
    t,
    colorRamp,
    colorFormats,
    selectedColorFormat: selectedColorFormat,
    changeColorFormat,
    handleCopy,
  };
};
