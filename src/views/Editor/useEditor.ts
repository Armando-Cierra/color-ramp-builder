import { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AppContext } from '@/context';
import {
  AppContextProps,
  ColorRamp,
  ColorRampColorPosition,
  InterpolationModes,
} from '@/types';
import { uid } from 'uid';

export const useEditor = () => {
  const location = useLocation();

  const { colorRamps } = useContext(AppContext) as AppContextProps;

  const [colorRamp, setColorRamp] = useState<ColorRamp>({
    id: uid(),
    date: new Date().getTime(),
    name: `Color Ramp ${colorRamps.length + 1}`,
    steps: 13,
    interpolationMode: 'rgb',
    colors: {
      extremeLeft: '#ffffff',
      central: undefined,
      extremeRight: '#000000',
    },
    percentages: [
      '0',
      '8',
      '17',
      '25',
      '33',
      '42',
      '50',
      '58',
      '67',
      '75',
      '83',
      '92',
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

  useEffect(() => {
    const defaultAction = () =>
      setColorRamp((prevState) => ({
        ...prevState,
        name: `Color Ramp ${colorRamps.length + 1}`,
      }));

    if (!location.state) {
      defaultAction();
    } else {
      const selectedColorRamp = colorRamps.find(
        (colorRamp) => colorRamp.id === location.state,
      );

      if (!selectedColorRamp) {
        defaultAction();
      } else {
        setColorRamp(selectedColorRamp as ColorRamp);
      }
    }
  }, [colorRamps, location]);

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
