export type ColorMode = 'light' | 'dark' | 'auto';

export type InterpolationModes = 'rgb' | 'hsl' | 'lab' | 'lch' | 'lrgb';

export type ColorRampColorPosition = 'extremeLeft' | 'central' | 'extremeRight';

export interface ColorRamp {
  name: string;
  steps: number;
  interpolationMode: InterpolationModes;
  colors: {
    extremeLeft: string;
    central: undefined | string;
    extremeRight: string;
  };
  percentages: string[];
}
