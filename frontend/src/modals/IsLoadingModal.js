import { Modal } from 'react-bootstrap';

const IsLoadingModal = (props) => {

  return (
    <div>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="text-large">
          <div>
            Cargando...
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default IsLoadingModal;
