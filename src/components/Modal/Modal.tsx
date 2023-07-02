import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { closeModal } from '../../services/slices/Modal/Modal';
import { removePost, removePosts } from '../../services/slices/Posts/Posts';

const ModalFC = () => {
  const isShowed = useAppSelector((state) => state.modal.isShowed);
  const currentPostIds = useAppSelector((state) => state.posts.currentPostIds);
  const postId = useAppSelector((state) => state.modal.postId);
  const modalTitle = useAppSelector((state) => state.modal.modalTitle);
  const isSinglePostSelected = useAppSelector((state) => state.modal.isSinglePostSelected);
  const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch(closeModal());
  };
  const handleRemovePost = () => {
    if (!isSinglePostSelected) {
      dispatch(removePosts(currentPostIds));
    } else {
      if (postId) {
        dispatch(removePost(postId));
      }
    }
    dispatch(closeModal());
  };
  return (
    <>
      <Modal show={isShowed} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Подтверждение удаления</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalTitle}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleRemovePost}>
            Да
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Отмена
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalFC;
