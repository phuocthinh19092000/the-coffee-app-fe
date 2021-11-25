import image4 from '../../share/assets/img/image4.png';
import './Background.scss';

function Background() {
  return (
    <div className="background">
      <img src={image4} alt={image4} className="background-img" />
    </div>
  );
}

export default Background;
