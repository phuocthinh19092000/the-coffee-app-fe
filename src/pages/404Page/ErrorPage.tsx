import './ErrorPage.scss';
import Button from '../../components/Button/Index';
import WrapperPage from '../../components/WrapperPage/WrapperPage';
import { useHistory } from 'react-router-dom';
import ErrorImage from '../../share/assets/img/error.png';
const ErrorPage = () => {
  const history = useHistory();
  const goHome = () => {
    let path = `/`;
    history.push(path);
  };
  return (
    <WrapperPage handleSearchPopup={() => {}}>
      <div className="error-page">
        <img src={ErrorImage} alt="Error Image" className="error-page__img" />
        <h2 className="error-page__title">404 - Page Not Found!</h2>
        <Button
          className="btn btn-primary btn--enabled error-page__button "
          titleButton="BACK TO HOME"
          onClick={goHome}
        />
      </div>
    </WrapperPage>
  );
};

export default ErrorPage;
