import './ComingSoon.scss';
import Button from '../Button/Index';
import { useHistory } from 'react-router-dom';
const ComingSoon = () => {
  const history = useHistory();
  const goHome = () => {
    let path = `/`;
    history.push(path);
  };
  return (
    <div className="coming-soon-container">
      <Button
        className="btn btn-primary btn--enabled coming-soon-container__button "
        titleButton="BACK TO HOME PAGE"
        onClick={goHome}
      />
    </div>
  );
};

export default ComingSoon;
