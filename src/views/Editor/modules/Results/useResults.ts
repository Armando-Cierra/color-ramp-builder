import { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { getColorRamp, colorFormat } from '@/utils';
import { EditorContext } from '../../context';
import { ColorFormats, EditorContextProps } from '@/types';

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

    navigator.clipboard.writeText(formattedColorRamp.join('\n'));
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
