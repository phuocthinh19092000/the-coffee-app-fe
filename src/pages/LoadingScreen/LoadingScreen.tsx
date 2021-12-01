import LoadingImage from '../../share/assets/img/loading.png';
import CountUp from 'react-countup';
import './LoadingScreen.scss';
const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-screen__img">
        <img src={LoadingImage} alt="Loading Screen" />
      </div>
      <div className=" loading-screen__title">
        <CountUp start={0} end={100} delay={0} duration={1.5}>
          {({ countUpRef }) => (
            <div>
              Loading <span ref={countUpRef} />%
            </div>
          )}
        </CountUp>
      </div>
      <p className="loading-screen__footer">One Tech Stop Vietnam @ 2021</p>
    </div>
  );
};

export default LoadingScreen;
