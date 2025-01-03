import { IconArrowLeft, IconEdit } from '@tabler/icons-react';
import { Button, Modal, Input } from '@/components';
import { useHeader } from './useHeader';
import './header.scss';

export const Header = () => {
  const {
    t,
    colorRampName,
    handleSubmit,
    isOpen,
    value,
    openModal,
    closeModal,
    changeValue,
  } = useHeader();

  return (
    <>
      {/* Modal */}
      <Modal isOpen={isOpen} onCloseModal={closeModal}>
        <Modal.Title>{t('editor.modalTitle')}</Modal.Title>
        <Modal.Content className="editor_header_modalContent">
          <form onSubmit={handleSubmit}>
            <Input value={value} onChange={changeValue} />
            <div className="editor_header_modalContent_buttonBox">
              <Button onClick={closeModal}>{t('general.cancel')}</Button>
              <Button variant="contrast" type="submit">
                {t('general.save')}
              </Button>
            </div>
          </form>
        </Modal.Content>
      </Modal>

      {/* Content */}
      <div className="editor_header">
        <Button variant="default">
          <IconArrowLeft />
          {t('general.goBack')}
        </Button>
        <div className="editor_header_content">
          <div className="editor_header_content_title">
            <h1>{colorRampName}</h1>
            <Button iconOnly onClick={openModal}>
              <IconEdit />
            </Button>
          </div>
          <Button variant="contrast">{t('editor.saveColorRamp')}</Button>
        </div>
      </div>
    </>
  );
};
