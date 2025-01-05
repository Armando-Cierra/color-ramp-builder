import { ColorFormats, Colors, InterpolationModes } from '@/types';
import chroma from 'chroma-js';

export const recalculateStepsPercentages = (newAmount: number) => {
  const newPercentages = [];

  for (let i = 0; i < newAmount; i++) {
    const value = Math.round((i / (newAmount - 1)) * 100);
    newPercentages.push(String(value));
  }

  return newPercentages;
};

export const getColorRamp = (
  colors: Colors,
  interpolationMode: InterpolationModes,
  percentages: string[],
) => {
  const { extremeLeft, central, extremeRight } = colors;
  const colorRamp: string[] = [];
  const gradient = chroma
    .scale(
      central
        ? [extremeLeft, central !== '-' ? central : '#ffffff', extremeRight]
        : [extremeLeft, extremeRight],
    )
    .mode(interpolationMode);

  percentages.forEach((percentage) => {
    const decimalPercentage = Number(percentage) / 100;
    colorRamp.push(gradient(decimalPercentage).hex());
  });

  return colorRamp;
};

export const getTextContrastColor = (color: string) => {
  const contrastLevel = chroma.contrast('#fff', color);
  return contrastLevel <= 4 ? '#000000' : '#ffffff';
};

export const colorFormat = (color: string, format: ColorFormats) => {
  if (format === 'hex') {
    return chroma(color).hex();
  }

  // @ts-expect-error | chroma types are missing formats that are on the documentation
  return chroma(color).css(format);
};
