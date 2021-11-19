import ErrorImage from '../../share/assets/img/error.png';
import '../Error/Error.scss';
import Button from '../Button/Index';
import { useHistory } from 'react-router-dom';
const Error = () => {
  const history = useHistory();
  const goHome = () => {
    let path = `/`;
    history.push(path);
  };
  return (
    <div className="error-container">
      <img src={ErrorImage} alt="Error Image" className="error-container__img" />
      <h2 className="error-container__title">404 - Page Not Found!</h2>
      <Button
        className="btn btn-primary btn--enabled error-container__button "
        titleButton="BACK TO HOME"
        onClick={goHome}
      />
    </div>
  );
};

export default Error;
