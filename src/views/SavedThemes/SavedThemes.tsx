import { IconArrowLeft, IconSearch, IconTrash } from '@tabler/icons-react';
import { Button, Input, Modal } from '@/components';
import { getStringDate } from '@/utils';
import { useSavedThemes } from './useSavedThemes';
import './savedThemes.scss';

export const SavedThemes = () => {
  const {
    t,
    goToHome,
    goToEditor,
    filter,
    filteredColorRamps,
    goToColorRamp,
    modalIsOpen,
    openModal,
    closeModal,
    deleteColorRamp,
    handleFilter,
    spaceKeyEvent,
  } = useSavedThemes();

  return (
    <>
      {/* Modal */}
      <Modal isOpen={modalIsOpen} onCloseModal={closeModal}>
        <Modal.Title>{t('savedThemes.modal.title')}</Modal.Title>
        <Modal.Description>
          {t('savedThemes.modal.description')}
        </Modal.Description>
        <Modal.Content className="savedThemes_modal_content">
          <Button onClick={closeModal}>{t('general.cancel')}</Button>
          <Button
            variant="contrast"
            interactiveSemantic="danger"
            onClick={deleteColorRamp}
          >
            {t('general.delete')}
          </Button>
        </Modal.Content>
      </Modal>

      {/* Content */}
      <div className="savedThemes">
        <div className="savedThemes_header">
          <div className="savedThemes_header_left">
            <Button onClick={goToHome}>
              <IconArrowLeft />
              {t('general.goBack')}
            </Button>
            <h1>{t('savedThemes.title')}</h1>
          </div>
          <Input
            placeholder={t('savedThemes.search')}
            value={filter}
            icon={<IconSearch />}
            onChange={handleFilter}
          />
        </div>
        <div className="savedThemes_content">
          {filteredColorRamps.map((colorRamp) => (
            <div
              tabIndex={0}
              className="savedThemes_content_element"
              key={colorRamp.id}
              onClick={goToColorRamp(colorRamp.id)}
              onKeyDown={spaceKeyEvent(colorRamp.id)}
            >
              <span className="savedThemes_content_element_name">
                {colorRamp.name}
              </span>
              <div className="savedThemes_content_element_right">
                <span>{getStringDate(colorRamp.date)}</span>
                <Button
                  iconOnly
                  interactiveSemantic="danger"
                  onClick={openModal(colorRamp.id)}
                >
                  <IconTrash />
                </Button>
              </div>
            </div>
          ))}
          {filteredColorRamps.length === 0 && filter === '' && (
            <div className="savedThemes_content_empty">
              <p>{t('savedThemes.empty')}</p>
              <Button variant="contrast" onClick={goToEditor}>
                {t('home.cards.newColorRamp')}
              </Button>
            </div>
          )}
          {filteredColorRamps.length === 0 && filter !== '' && (
            <p className="savedThemes_content_noResults">
              {t('savedThemes.noResults')}
            </p>
          )}
        </div>
      </div>
    </>
  );
};
