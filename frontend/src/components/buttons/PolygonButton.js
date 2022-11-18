import {Button } from 'react-bootstrap';
import '../../styles/Home.css';


const PolygonButton = ({handleOnClick}) => {

  return (
    <div>
      <Button onClick={handleOnClick}>Cambiar a Polygon Testnet</Button>
    </div>
  );
};

export default PolygonButton;
