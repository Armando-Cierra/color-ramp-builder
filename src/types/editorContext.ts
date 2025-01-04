import {
  ColorRamp,
  InterpolationModes,
  ColorRampColorPosition,
} from './general';

export interface EditorContextProps {
  colorRamp: ColorRamp;
  actions: {
    changeName: (newName: string) => void;
    changeSteps: (newSteps: number) => void;
    changeInterpolationMode: (newInterpolationMode: InterpolationModes) => void;
    changeColor: (
      colorPosition: ColorRampColorPosition,
      newColor: string | undefined,
    ) => void;
    changePercentage: (index: number, newValue: string) => void;
  };
}
