import { useContext } from 'react';
import { Modal } from 'react-bootstrap';
import reward from '../assets/TAROrew.png';
import verify from '../assets/verify.svg';

const QuizFailureModal = (props) => {
  return (
    <div>
      <Modal
        {...props}
        size="lg"
        centered
        className="modal-2"
      >
        <h1><span>Respuesta incorrecta </span></h1><br/>
        <h3>Fallaste la validación o falta alguna respuesta, echa un vistazo a la documentación o intenta nuevamente.</h3>
        <Modal.Body>
        <div class="void-link">
          <div class="prop-bgr"><a href="/About">
            <img src={reward} class="ribvan"/> 
            <div class="propsub">Ver documentación</div>
            <div class="propopt">Conoce +</div>
          </a></div>
            <div class="prop-bgr"><a href="/Quiz">
            <img src={verify} class="ribvan"/>
            <div class="propsub">Intentalo de nuevo </div>
            |<div class="propopt">Revisar</div>
          </a></div>
        </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default QuizFailureModal;
