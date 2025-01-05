import { useContext, useState, useEffect, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { EditorContext } from '../../context';
import { getColorRamp, recalculateStepsPercentages } from '@/utils';
import { EditorContextProps } from '@/types';
import { Slide, toast } from 'react-toastify';

export const useColorRamp = () => {
  const { t } = useTranslation();

  const {
    colorRamp: { colors, interpolationMode, percentages },
    actions: { changePercentage, changePercentagesAmount },
  } = useContext(EditorContext) as EditorContextProps;

  const [percentagesValues, setpercentagesValues] =
    useState<string[]>(percentages);

  const [colorRamp, setColorRamp] = useState<string[]>(
    getColorRamp(colors, interpolationMode, percentagesValues),
  );

  const handlePercentageInput =
    (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      let filteredValue = value.replace(/[^0-9]/g, '').slice(0, 3);

      if (Number(filteredValue) > 100) {
        filteredValue = filteredValue.slice(0, -1);
      }

      changePercentage(index, filteredValue);
    };

  const resetPercentages = () => {
    const stepsAmount = percentages.length;
    const newPercentages = recalculateStepsPercentages(stepsAmount);

    changePercentagesAmount(newPercentages);
  };

  const copyColor = (color: string) => () => {
    navigator.clipboard.writeText(color).then(() => {
      toast(`${color} ${t('editor.colorRamp.copied')}`, {
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

  useEffect(() => {
    setpercentagesValues(percentages);
    setColorRamp(getColorRamp(colors, interpolationMode, percentages));
  }, [percentages, interpolationMode, colors]);

  return {
    t,
    percentagesValues,
    colorRamp,
    handlePercentageInput,
    resetPercentages,
    copyColor,
  };
};
