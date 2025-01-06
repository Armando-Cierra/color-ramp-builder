import { ColorRamp } from './general';

export interface AppContextProps {
  colorRamps: ColorRamp[];
  addColorRamp: (newColorRamp: ColorRamp) => void;
  removeColorRamp: (id: string) => void;
}
