import Card from '../../../../components/Card/Index';
import StaffImg from '../../../../share/assets/img/LoginStaff.png';
import FormLoginStaff from '../../components/FormLoginStaff/FormLoginStaff';
import Icon from '../../../../components/Icon/Icon';
import FacebookIcon from '../../../../share/assets/vector/VectorFacebook.svg';
import InstaIcon from '../../../../share/assets/vector/VectorInsta.svg';
import LinkedinIcon from '../../../../share/assets/vector/VectorLinkedin.svg';
import { useSelector } from 'react-redux';
import { selectLoginState, selectUserState } from '../../../auth/actions/auth';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { ROLE } from '../../../../enum';

const LoginStaff = () => {
  const user = useSelector(selectUserState);
  const accessToken = useSelector(selectLoginState);
  const history = useHistory();

  useEffect(() => {
    if (accessToken && user.role === ROLE.VENDOR) {
      history.push('/staff');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <Card className="card card--center">
        <img src={StaffImg} alt="Login Staff" className="mb-5" />
        <div className="w-full">
          <FormLoginStaff />
        </div>
        <div>
          <div className="brand-media">
            <Icon href="https://www.facebook.com/OneTechStopVietnam/" src={FacebookIcon} className="icon" />
            <Icon href="https://www.instagram.com/OneTechStopVietnam/" src={InstaIcon} className="icon" />
            <Icon href="https://www.linkedin.com/OneTechStopVietnam/" src={LinkedinIcon} className="icon" />
          </div>
          <div className="card__content">
            <p className="login-staff ">ONE TECH STOP VIET NAM</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default LoginStaff;
