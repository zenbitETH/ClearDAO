import { Modal } from 'react-bootstrap';

import prop from '../assets/prop.svg';
import send from '../assets/sended.svg';
import vote2 from '../assets/vote2.svg';

const CreateProposalSuccessModal = (props) => {

  return (
    <div >
      <Modal
        class="grid-block"
        {...props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="main"
      >
      <div class="center"><div class="jump"><img src={send} alt="Alert about verification" class="prop-img"/></div></div>
      <h1><div >¡Propuesta enviada! </div></h1><br/>
      <h3>Tu propuesta esta lista para ser votada<span class="yellow"> usa tu VOTO para votar. </span>
      </h3>
        <div class="void-link">
          <div class="prop-bg2"><a href="/ProposalList#vote">
              <img src={vote2} class="ribvan"/> 
              <div class="propsub">Propuestas por</div>
              <div class="propopt">Votar</div>
            </a></div>
            <div class="prop-bg2"><a href="/CreateProposal">
              <img src={prop} class="ribvan"/>
              <div class="propsub">Nueva propuesta</div>
              <div class="propopt">Proponer </div>
            </a></div>
          </div>
      </Modal>
    </div>
  );
};

export default CreateProposalSuccessModal;
