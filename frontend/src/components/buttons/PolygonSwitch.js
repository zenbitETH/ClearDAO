import { Button } from 'react-bootstrap';
import '../../styles/Home.css';

const PolygonSwitch = () => {
  return (
    <div>
    <Button variant="secondary" disabled>
      Cambiando a Polygon...
      <span animation="border"className="spinner-grow" role="status"></span>
    </Button>
    </div>
  );
};
export default PolygonSwitch;
