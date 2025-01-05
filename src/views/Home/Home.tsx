import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { IconPlus, IconBookmark, IconBrandGithub } from '@tabler/icons-react';
import { Card } from '@/components';
import './home.scss';

export const Home = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      className="home"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
    >
      <p className="home_description">{t('home.description')}</p>
      <div className="home_contentBox">
        <Card
          isInnerLink
          icon={<IconPlus />}
          text={t('home.cards.newColorRamp')}
          linksTo="/editor"
        />
        <Card
          isInnerLink
          icon={<IconBookmark />}
          text={t('home.cards.savedColorRamps')}
          linksTo="/saved-color-ramps"
        />
        <Card
          icon={<IconBrandGithub />}
          text={t('home.cards.github')}
          linksTo="https://github.com/Armando-Cierra/color-ramp-builder"
        />
      </div>
    </motion.div>
  );
};
