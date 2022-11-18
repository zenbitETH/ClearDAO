import verify from '../assets/verify.svg';

const ValidationRequired = () => {

  return (
    <div class="connect">
      <a href="/quiz" >
      <div className="main">
      <h1><span id="vote">Validate your address</span></h1><br/>
          <div class="center"><img src={verify} alt="Alert about verification" class="prop-img"/></div>
      </div>
      <div className ="floating">
      </div>
    </a>

    </div>
  );
};

export default ValidationRequired;
