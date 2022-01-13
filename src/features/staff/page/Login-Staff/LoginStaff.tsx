import Card from '../../../../components/Card/Index';
import StaffImg from '../../../../share/assets/img/LoginStaff.png'
import FormLoginStaff from '../../components/FormLoginStaff/FormLoginStaff';
import './LoginStaff.scss'
import Icon from '../../../../components/Icon/Icon';
import FacebookIcon from '../../../../share/assets/vector/VectorFacebook.svg';
import InstaIcon from '../../../../share/assets/vector/VectorInsta.svg';
import LinkedinIcon from '../../../../share/assets/vector/VectorLinkedin.svg';
const LoginStaff = () => {
	return (
		<div className="login-staff">
			<Card className="card card--center ">
					<img src={StaffImg} alt="Login Staff" className="login-staff__img" />
				<div className='w-full'>
					<FormLoginStaff />
				</div>
				<div>
					<div className="brand-media">
						<Icon href='https://www.facebook.com/OneTechStopVietnam/' src={FacebookIcon} className='icon'/>
						<Icon href='https://www.instagram.com/OneTechStopVietnam/' src={InstaIcon} className='icon'/>
						<Icon href='https://www.linkedin.com/OneTechStopVietnam/' src={LinkedinIcon} className='icon'/>
					</div>
					<div className="card__content">
						<p className="login-staff ">ONE TECH STOP VIET NAM</p>
					</div>
				</div>
			</Card>
			
		</div>
	)
}
export default  LoginStaff;