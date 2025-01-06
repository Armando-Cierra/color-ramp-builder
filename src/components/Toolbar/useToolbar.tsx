import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { ColorMode } from '@/types';

export const useToolbar = () => {
  const navigate = useNavigate();
  const isElectron = navigator.userAgent.toLowerCase().includes('electron');
  const getPlatform = () => {
    //@ts-expect-error | checks if userAgentData is available on the browser. This is abeta feature and that's why TS is not detecting it as an existing type.
    if (navigator.userAgentData) {
      // Use User-Agent Client Hints if available
      const platform =
        //@ts-expect-error | Same as before
        navigator.userAgentData.platform ||
        //@ts-expect-error | Same as before
        navigator.userAgentData.brands.map((brand) => brand.brand).join(' ');
      return platform.toLowerCase();
    } else {
      // Fallback to navigator.userAgent
      const platform = navigator.userAgent.toLowerCase();
      if (platform.includes('mac')) return 'mac';
      if (platform.includes('win')) return 'win';
      if (platform.includes('linux')) return 'linux';
      return 'unknown';
    }
  };

  const platform = getPlatform();
  const isMac = platform.includes('mac');
  const isWindows = platform.includes('win');

  const { pathname } = useLocation();
  const [theme, setTheme] = useState<ColorMode>(
    (localStorage.getItem('colormode') as ColorMode) ?? 'light',
  );
  const [lang, setLang] = useState(i18next.language);
  const { t } = useTranslation();

  const changeTheme = (selectedTheme: ColorMode) => () => {
    if (selectedTheme === 'auto') {
      const systemPreference = window.matchMedia(
        '(prefers-color-scheme: light)',
      );

      if (systemPreference.matches) {
        document.body.className = 'light';
      } else {
        document.body.className = 'dark';
      }

      window.localStorage.setItem('colormode', selectedTheme);
      setTheme(selectedTheme);
    } else {
      document.body.className = selectedTheme;
      window.localStorage.setItem('colormode', selectedTheme);
      setTheme(selectedTheme);
    }
  };

  const changeLanguage = (lang: 'en' | 'es') => () => {
    i18next.changeLanguage(lang);
    setLang(lang);
  };

  const navigateToHome = () => navigate('/');

  const minimizeWindows = () => {
    window.ipcRenderer.windowControls.minimize();
  };

  const maximizeWindows = () => {
    window.ipcRenderer.windowControls.maximize();
  };

  const closeWindows = () => {
    window.ipcRenderer.windowControls.close();
  };

  return {
    t,
    pathname,
    theme,
    changeTheme,
    changeLanguage,
    activeLang: lang,
    isElectron,
    isMac,
    isWindows,
    navigateToHome,
    minimizeWindows,
    maximizeWindows,
    closeWindows,
  };
};
