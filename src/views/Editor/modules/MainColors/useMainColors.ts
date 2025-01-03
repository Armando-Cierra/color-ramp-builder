import { useTranslation } from 'react-i18next';

export const useMainColors = () => {
  const { t } = useTranslation();

  return {
    t,
  };
};
