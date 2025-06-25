import classNames from 'classnames';
import { HexColorPicker } from 'react-colorful';
import { useMainColors } from './useMainColors';
import { Button, ButtonGroup, Input } from '@/components';
import './mainColors.scss';

export const MainColors = () => {
  const {
    t,
    colorPickersConfig,
    central,
    handleManualColorChange,
    handleColorPicker,
    toggleSwitch,
  } = useMainColors();

  return (
    <div className="mainColors">
      <h2 className="editor_content_title">{t('editor.mainColors.title')}</h2>
      <div className="mainColors_box">
        {colorPickersConfig.map(
          ({ position, label, color, value, isDisabled, showButtons }) => (
            <div className="mainColor_colorPicker" key={position}>
              {isDisabled ? (
                <div className="react-colorful--disabled" />
              ) : (
                <HexColorPicker
                  className={classNames({
                    'react-colorful--disabled':
                      position === 'central' && central === undefined,
                  })}
                  color={color ?? '#ffffff'}
                  onChange={handleColorPicker(position)}
                />
              )}
              <div className="mainColor_colorPicker_control">
                <div className="mainColor_colorPicker_control_label">
                  <span>{label}</span>
                  {showButtons && (
                    <ButtonGroup>
                      <Button
                        isSelected={central === undefined}
                        onClick={toggleSwitch('inactive')}
                      >
                        {t('general.inactive')}
                      </Button>
                      <Button
                        isSelected={central !== undefined}
                        onClick={toggleSwitch('active')}
                      >
                        {t('general.active')}
                      </Button>
                    </ButtonGroup>
                  )}
                </div>
                <Input
                  isDisabled={isDisabled}
                  value={value ?? '-'}
                  onChange={handleManualColorChange(position)}
                />
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
};
