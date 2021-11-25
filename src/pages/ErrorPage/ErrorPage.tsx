import './ErrorPage.scss';
import Error from '../../components/Error/Error';
import WrapperPage from '../../components/WrapperPage/WrapperPage';

const ErrorPage = () => {
  return (
    <div className="error-page">
      <WrapperPage />
      <div className="error-component">
        <Error />
      </div>
    </div>
  );
};

export default ErrorPage;
