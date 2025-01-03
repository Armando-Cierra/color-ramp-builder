import { IconPlus, IconMinus } from '@tabler/icons-react';
import {
  Modal,
  InlineNotification,
  Button,
  Input,
  Checkbox,
  Dropdown,
} from '@/components';
import { useSettings } from './useSettings';
import './settings.scss';
import { InterpolationModes } from '@/types';

export const Settings = () => {
  const {
    t,
    steps,
    selectedInterpolationMode,
    interpolationModes,
    modalIsOpen,
    openModal,
    closeModal,
    modalActions,
    inlineNotificationIsVisible,
    inlineNotificationIsHidden,
    increaseSteps,
    decreaseSteps,
    handleChange,
    handleCheckbox,
    selectInterpolationMode,
  } = useSettings();

  return (
    <>
      {/* Modal */}
      <Modal isOpen={modalIsOpen} onCloseModal={closeModal}>
        <Modal.Title>{t('editor.settings.modal.title')}</Modal.Title>
        <Modal.Content className="editor_content_modal">
          <div className="editor_content_modal_checkbox">
            <Checkbox id="editor_settings_checkbox" onChange={handleCheckbox} />
            <label htmlFor="editor_settings_checkbox">
              {t('editor.settings.modal.description')}
            </label>
          </div>
          <div className="editor_content_modal_buttonBox">
            <Button onClick={modalActions('cancel')} variant="ghost">
              {t('general.cancel')}
            </Button>
            <Button onClick={modalActions('no')} variant="default">
              {t('editor.settings.modal.no')}
            </Button>
            <Button onClick={modalActions('yes')} variant="contrast">
              {t('editor.settings.modal.yes')}
            </Button>
          </div>
        </Modal.Content>
      </Modal>

      {/* Content */}
      <div className="editor_content_section">
        <h2 className="editor_content_title">{t('editor.settings.title')}</h2>
        {!inlineNotificationIsHidden && inlineNotificationIsVisible && (
          <InlineNotification variant="info" onClose={openModal}>
            {t('editor.settings.inlineNotification')}
          </InlineNotification>
        )}
        <div className="editor_content_section_content">
          <div className="editor_content_section_group">
            <span>{t('editor.settings.amountOfSteps')}</span>
            <Button iconOnly onClick={decreaseSteps}>
              <IconMinus />
            </Button>
            <Input value={String(steps)} onChange={handleChange} />
            <Button iconOnly onClick={increaseSteps}>
              <IconPlus />
            </Button>
          </div>
          <div className="editor_content_section_group">
            <span>{t('editor.settings.interpolationMode')}</span>
            <Dropdown
              className="editor_content_section_group_dropdown"
              value={selectedInterpolationMode}
            >
              {interpolationModes.map((mode) => (
                <Dropdown.Option
                  key={mode}
                  isSelected={mode === selectedInterpolationMode}
                  onClick={selectInterpolationMode(mode as InterpolationModes)}
                >
                  {mode}
                </Dropdown.Option>
              ))}
            </Dropdown>
          </div>
        </div>
      </div>
    </>
  );
};
