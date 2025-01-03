import { Tooltip } from 'react-tooltip';
import { Template } from '@/Template';
import { tooltipID, tooltipStyles } from '@/utils';
import { Route, Routes } from 'react-router-dom';
import { Home, Editor, SavedThemes, Error404 } from '@/views';
import { AnimatePresence } from 'framer-motion';

export default function App() {
  return (
    <>
      <Tooltip style={tooltipStyles} id={tooltipID} />
      <Template>
        <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            <Route index path="/" element={<Home />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/saved-color-ramps" element={<SavedThemes />} />
            <Route path="/*" element={<Error404 />} />
          </Routes>
        </AnimatePresence>
      </Template>
    </>
  );
}
