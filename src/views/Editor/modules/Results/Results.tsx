import { IconCopy } from '@tabler/icons-react';
import { Dropdown, Button } from '@/components';
import { useResults } from './useResults';
import { colorFormat } from '@/utils';
import { ColorFormats } from '@/types';
import './results.scss';

export const Results = () => {
  const {
    t,
    selectedColorFormat,
    colorFormats,
    changeColorFormat,
    colorRamp,
    handleCopy,
  } = useResults();

  return (
    <div className="results">
      <h2 className="editor_content_title">{t('editor.results.title')}</h2>

      <div className="results_terminal">
        {/* Header */}
        <div className="results_terminal_header">
          <div className="results_terminal_header_dropdown">
            <span>{t('editor.results.colorFormat')}</span>
            <Dropdown value={selectedColorFormat}>
              {colorFormats.map((format) => (
                <Dropdown.Option
                  key={format}
                  value={format}
                  onClick={() => changeColorFormat(format as ColorFormats)}
                >
                  {format}
                </Dropdown.Option>
              ))}
            </Dropdown>
          </div>
          <Button onClick={handleCopy}>
            <IconCopy />
            {t('general.copy')}
          </Button>
        </div>

        {/* Content */}
        <div className="results_terminal_content">
          {colorRamp.map((color, index) => (
            <div
              key={`colorRampColor_${index}`}
              className="results_terminal_content_color"
            >
              <span className="results_terminal_content_color_number">
                {index + 1}
              </span>
              <span className="results_terminal_content_color_text">
                {colorFormat(color, selectedColorFormat)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
