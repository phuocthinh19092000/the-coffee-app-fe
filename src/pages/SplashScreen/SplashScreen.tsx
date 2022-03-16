import LoadingAnimation from '../../share/assets/animations/Loading.gif';

import CountUp from 'react-countup';
import './SplashScreen.scss';
const SplashScreen = () => {
  return (
    <div className="splash-screen">
      <div className="splash-screen__img">
        <img src={LoadingAnimation} alt="Loading Screen" />
      </div>
      <div className=" splash-screen__title">
        <CountUp start={0} end={100} delay={0} duration={1.5}>
          {({ countUpRef }) => (
            <div>
              Loading <span ref={countUpRef} />%
            </div>
          )}
        </CountUp>
      </div>
      <p className="splash-screen__footer">One Tech Stop Vietnam @ 2021</p>
    </div>
  );
};

export default SplashScreen;
