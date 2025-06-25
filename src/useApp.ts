import { useEffect, useState } from 'react';
import { ColorRamp } from './types';

export const useApp = () => {
  const [colorRamps, setColorRamps] = useState<ColorRamp[]>([]);

  const addColorRamp = (newColorRamp: ColorRamp) => {
    setColorRamps((prevState) => [...prevState, newColorRamp]);
  };

  const removeColorRamp = (id: string) => {
    setColorRamps((prevState) => {
      const updatedColorRamps = prevState.filter(
        (colorRamp) => colorRamp.id !== id,
      );
      localStorage.setItem('colorRamps', JSON.stringify(updatedColorRamps));
      return [...updatedColorRamps];
    });
  };

  useEffect(() => {
    const savedColorRamps = localStorage.getItem('colorRamps');
    if (savedColorRamps === null) {
      setColorRamps([]);
    } else {
      setColorRamps(JSON.parse(savedColorRamps));
    }

    localStorage.removeItem('centralColor');
  }, []);

  return {
    colorRamps,
    addColorRamp,
    removeColorRamp,
  };
};
