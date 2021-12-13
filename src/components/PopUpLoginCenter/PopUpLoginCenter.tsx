import Card from '../Card/Index';
import Exit from '../../share/assets/vector/Exit.svg';
import './PopUpLoginCenter.scss';
import FormLogin from '../FormLogin/FormLogin';
type Props = {
  onClick?: React.MouseEventHandler<HTMLElement>;
};

function PopUpLoginCenter(props: Props) {
  return (
    <div className="card-login-center--blur">
      <Card className="card card--center card-login-center">
        <a>
          <img src={Exit} className="card-login-center__exit" onClick={props.onClick}></img>
        </a>
        <p className="card-login-center__description">Please login to proceed the order:</p>
        <div className="mt-100">
          <FormLogin />
        </div>
      </Card>
    </div>
  );
}

export default PopUpLoginCenter;
