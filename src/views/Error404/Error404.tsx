import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from '@/components';
import './error.scss';

export const Error404 = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      className="error"
    >
      <h1>404</h1>
      <p>{t('error.description')}</p>
      <Button variant="contrast" onClick={() => navigate('/')}>
        {t('error.goHome')}
      </Button>
    </motion.div>
  );
};
