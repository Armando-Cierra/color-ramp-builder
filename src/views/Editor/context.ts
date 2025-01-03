import { createContext } from 'react';
import { EditorContextProps } from '@/types';

export const EditorContext = createContext<EditorContextProps | null>(null);
