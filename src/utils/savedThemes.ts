import i18next from 'i18next';

export const getStringDate = (time: number) => {
  const lang = i18next.language;

  const date = new Date(time);
  return date.toLocaleDateString(lang === 'en' ? 'en-US' : 'es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
