import {Alert} from 'react-bootstrap';

const InstallMetamaskAlert = () => {

  return (
    <div>
      <Alert className= "valert">
          <div >
            <div className="big-icon">⚠️</div>
            <div className="white">Parece que estas conectado a otra red</div>
          </div>

      </Alert>
    </div>
  );
};

export default InstallMetamaskAlert;
