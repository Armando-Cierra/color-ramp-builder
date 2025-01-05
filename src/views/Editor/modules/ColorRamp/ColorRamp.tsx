import { IconRotate, IconCopy } from '@tabler/icons-react';
import { useColorRamp } from './useColorRamp';
import { Button, Input } from '@/components';
import { getTextContrastColor } from '@/utils';
import './colorRamp.scss';

export const ColorRamp = () => {
  const {
    t,
    percentagesValues,
    colorRamp,
    handlePercentageInput,
    resetPercentages,
    copyColor,
  } = useColorRamp();

  return (
    <div className="colorRamp">
      <h2 className="editor_content_title">{t('editor.colorRamp.title')}</h2>
      <div className="colorRamp_info">
        <span>{t('editor.colorRamp.percentages')}</span>
        <Button onClick={resetPercentages}>
          <IconRotate />
          {t('editor.colorRamp.reset')}
        </Button>
      </div>
      <div className="colorRamp_percentages">
        {percentagesValues.map((percentage, index) => (
          <Input
            key={`colorRampPercentage_${index}`}
            value={percentage}
            onChange={handlePercentageInput(index)}
          />
        ))}
      </div>
      <div className="colorRamp_scale">
        {colorRamp.map((color, index) => (
          <button
            className="colorRamp_scale_color"
            style={{ background: color, padding: '8px' }}
            key={`colorRampColor_${index}`}
            onClick={copyColor(color)}
          >
            <IconCopy style={{ color: getTextContrastColor(color) }} />
          </button>
        ))}
      </div>
    </div>
  );
};
