import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';
import { spring } from '@/utils';
import { Content, Description, Title } from './modules';
import { useModal } from './useModal';
import './modal.scss';

interface Props {
  className?: string;
  children: ReactNode;
  isOpen?: boolean;
  onCloseModal?: () => void;
}

export const Modal = Object.assign(
  ({ isOpen, children, className: customClassName, onCloseModal }: Props) => {
    const { title, description, content, handleClick } = useModal(
      children,
      onCloseModal,
    );

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="modal"
            onClick={handleClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              ...spring,
              animate: { duration: 1 },
              exit: { duration: 0.5, delay: 0.5 },
            }}
          >
            <motion.div
              className={classNames('modal_card', {
                [customClassName as string]: customClassName,
              })}
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              exit={{ y: -50 }}
              transition={{
                ...spring,
                animate: { duration: 0.5, delay: 0.5 },
                exit: { duration: 0.5 },
              }}
            >
              <div className="modal_header">
                {title}
                {description}
              </div>
              {content}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  },
  {
    Title,
    Description,
    Content,
  },
);
