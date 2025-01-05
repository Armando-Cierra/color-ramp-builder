import { useState, useContext } from 'react';
import { AppContext } from '@/context';
import {
  AppContextProps,
  ColorRamp,
  ColorRampColorPosition,
  InterpolationModes,
} from '@/types';

export const useEditor = () => {
  const { colorRamps } = useContext(AppContext) as AppContextProps;

  const [colorRamp, setColorRamp] = useState<ColorRamp>({
    name: `Color Ramp ${colorRamps.length + 1}`,
    steps: 11,
    interpolationMode: 'lab',
    colors: {
      extremeLeft: '#ffffff',
      central: undefined,
      extremeRight: '#000000',
    },
    percentages: [
      '0',
      '10',
      '20',
      '30',
      '40',
      '50',
      '60',
      '70',
      '80',
      '90',
      '100',
    ],
  });

  const changeName = (newName: string) => {
    setColorRamp((prevState) => ({ ...prevState, name: newName.trim() }));
  };

  const changeSteps = (newAmount: number) => {
    setColorRamp((prevState) => ({ ...prevState, steps: newAmount }));
  };

  const changeInterpolationMode = (newMode: InterpolationModes) => {
    setColorRamp((prevState) => ({ ...prevState, interpolationMode: newMode }));
  };

  const changeColor = (
    colorPosition: ColorRampColorPosition,
    newColor: string | undefined,
  ) => {
    setColorRamp((prevState) => ({
      ...prevState,
      colors: { ...prevState.colors, [colorPosition]: newColor },
    }));
  };

  const changePercentagesAmount = (newArray: string[]) => {
    setColorRamp((prevState) => ({
      ...prevState,
      percentages: newArray,
    }));
  };

  const changePercentage = (index: number, newValue: string) => {
    const newPercentages = [...colorRamp.percentages];
    newPercentages[index] = newValue;
    setColorRamp((prevState) => ({
      ...prevState,
      percentages: newPercentages,
    }));
  };

  return {
    colorRamp,
    actions: {
      changeName,
      changeSteps,
      changeInterpolationMode,
      changeColor,
      changePercentage,
      changePercentagesAmount,
    },
  };
};
