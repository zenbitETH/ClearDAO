import { Modal } from 'react-bootstrap';

import confirm from '../assets/confirm.svg';
import prop from '../assets/prop.svg';
import vote2 from '../assets/vote2.svg';


const QuizAlreadySubmittedModal = (props) => {

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modal-2"
      >
        <div class="center"><div><img src={confirm} alt="Alert about verification" class="prop-img"/></div></div>
        <h1><span>Tu cuenta ya está validada </span></h1><br/>
        <h3> Ahora puedes crear y votar por propuestas de gobernanza urbana en Querévoto.</h3>
        <Modal.Body>
          <div class="void-link">
          <div class="prop-bg"><a href="/Createproposal">
            <img src={prop} class="ribvan"/> 
            <div class="propsub">Crear propuesta</div>
            <div class="propopt">Proponer</div>
          </a></div>
          <div class="prop-bg2"><a href="/ProposalList">
            <img src={vote2} class="ribvan"/>
            <div class="propsub">Propuestas por </div>
            <div class="propopt">Votar</div>
          </a></div>
        </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default QuizAlreadySubmittedModal;
