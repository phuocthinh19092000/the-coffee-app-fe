import Button from '../Button/Index';
import { useHistory } from 'react-router-dom';
import Imgage from '../../share/assets/img/error.png';
import './Error.scss';
const Error = () => {
  const history = useHistory();
  const goHome = () => {
    let path = `/`;
    history.push(path);
  };
  return (
    <div className="error-page">
      <img src={Imgage} alt="Error" className="error-page__img" />
      <h2 className="error-page__title">404 - Page Not Found!</h2>
      <Button
        className="btn btn-primary btn--enabled error-page__button "
        titleButton="BACK TO HOME"
        onClick={goHome}
      />
    </div>
  );
};
export default Error;