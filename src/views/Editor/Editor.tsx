import { motion } from 'framer-motion';
import { Header, Content } from './modules';
import { useEditor } from './useEditor';
import { EditorContext } from './context';
import './editor.scss';

export const Editor = () => {
  const { colorRamp, actions } = useEditor();

  return (
    <EditorContext.Provider value={{ colorRamp, actions }}>
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
        className="editor"
      >
        <Header />
        <Content />
      </motion.div>
    </EditorContext.Provider>
  );
};
