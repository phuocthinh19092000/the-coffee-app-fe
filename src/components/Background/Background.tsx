import MaskGroup from '../../share/assets/img/MaskGroup.jpg';
import './Background.css';

function Background() {
  return (
    <div className="background">
      <img src={MaskGroup} alt="Mask Group Background" className="background-img" />
    </div>
  );
}

export default Background;
