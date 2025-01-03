import { useEffect, useState } from 'react';
import { ColorRamp } from './types';

export const useApp = () => {
  const [colorRamps, setColorRamps] = useState<ColorRamp[]>([]);

  const addColorRamp = (newColorRamp: ColorRamp) => {
    setColorRamps((prevState) => [...prevState, newColorRamp]);
  };

  const removeColorRamp = (index: number) => {
    setColorRamps((prevState) => prevState.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const savedColorRamps = localStorage.getItem('colorRamps');
    if (savedColorRamps === null) {
      setColorRamps([]);
    } else {
      setColorRamps(JSON.parse(savedColorRamps));
    }
  }, []);

  return {
    colorRamps,
    addColorRamp,
    removeColorRamp,
  };
};
