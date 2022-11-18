import { Modal } from 'react-bootstrap';
import voidz from '../assets/void.png';
import prop from '../assets/prop.svg';

const CreateProposalErrorModal = (props) => {

  return (
    <div>
      <Modal
        class="grid-block"
        {...props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modal-2"
      >
        <div class="center"><div><img src={voidz} alt="Alert about verification" class="prop-img"/></div></div>
        <h1><span>La propuesta no se envió </span></h1><br/>

        <div class="about-tx2">
          ⚠️ 1. Asegurate de estar conectado a MetaMask y de haber ingresado su información correctamente.<br/><br/>
          ⚠️ 2. Además, asegurate de haber validado tu cuenta y haber llenado todos los campos.<br/><br/>
        <div class="prop-bg"><a href="/CreateProposal">
          <img src={prop} class="homevan"/>
          <div class="propsub">Revisa propuesta</div>
          <div class="propopt">Intentarlo de nuevo</div>
        </a></div>
        </div>
      </Modal>
    </div>
  );
};

export default CreateProposalErrorModal;
