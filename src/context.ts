import { createContext } from 'react';
import { AppContextProps } from '@/types';

export const AppContext = createContext<AppContextProps | null>(null);
