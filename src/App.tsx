import { Tooltip } from 'react-tooltip';
import { Template } from '@/Template';
import { AnimatePresence } from 'framer-motion';
import { tooltipID, tooltipStyles } from '@/utils';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Home, Editor, SavedThemes, Error404 } from '@/views';
import { ToastContainer, Slide } from 'react-toastify';
import { useApp } from './useApp';
import { AppContext } from './context';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const location = useLocation();
  const { colorRamps, addColorRamp, removeColorRamp } = useApp();

  return (
    <AppContext.Provider value={{ colorRamps, addColorRamp, removeColorRamp }}>
      <Tooltip style={tooltipStyles} id={tooltipID} />
      <ToastContainer
        position="bottom-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="colored"
        transition={Slide}
        limit={1}
      />
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
    </AppContext.Provider>
  );
}
