export type ColorMode = 'light' | 'dark' | 'auto';

export type InterpolationModes = 'rgb' | 'hsl' | 'lab' | 'lch' | 'lrgb';

export type ColorRampColorPosition = 'extremeLeft' | 'central' | 'extremeRight';

export type ColorFormats = 'hex' | 'rgb' | 'hsl';

export type Colors = {
  extremeLeft: string;
  central: undefined | string;
  extremeRight: string;
};

export interface ColorRamp {
  id: string;
  date: number;
  name: string;
  steps: number;
  interpolationMode: InterpolationModes;
  colors: Colors;
  percentages: string[];
}
