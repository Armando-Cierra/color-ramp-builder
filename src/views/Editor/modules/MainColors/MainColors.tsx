import { Button, ButtonGroup, Input } from '@/components';
import { HexColorPicker } from 'react-colorful';
import { useMainColors } from './useMainColors';
import './mainColors.scss';

export const MainColors = () => {
  const { t } = useMainColors();

  return (
    <div className="mainColors">
      <h2 className="editor_content_title">{t('editor.mainColors.title')}</h2>
      <div className="mainColors_box">
        {/* Extreme Left */}
        <div className="mainColor_colorPicker">
          <HexColorPicker
            color={'#ffffff'}
            // onChange={handleColorRampChange('contrast')}
          />
          <div className="mainColor_colorPicker_control">
            <div className="mainColor_colorPicker_control_label">
              <span>{t('editor.mainColors.extremeLeft')}</span>
            </div>
            <Input value="#ffffff" onChange={() => {}} />
          </div>
        </div>

        {/* Central */}
        <div className="mainColor_colorPicker">
          <HexColorPicker
            color={'#ffffff'}
            // onChange={handleColorRampChange('contrast')}
          />
          <div className="mainColor_colorPicker_control">
            <div className="mainColor_colorPicker_control_label">
              <span>{t('editor.mainColors.central')}</span>
              <ButtonGroup>
                <Button>{t('general.inactive')}</Button>
                <Button>{t('general.active')}</Button>
              </ButtonGroup>
            </div>
            <Input value="#ffffff" onChange={() => {}} />
          </div>
        </div>

        {/* Extreme Right */}
        <div className="mainColor_colorPicker">
          <HexColorPicker
            color={'#ffffff'}
            // onChange={handleColorRampChange('contrast')}
          />
          <div className="mainColor_colorPicker_control">
            <div className="mainColor_colorPicker_control_label">
              <span>{t('editor.mainColors.extremeLeft')}</span>
            </div>
            <Input value="#ffffff" onChange={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
};
