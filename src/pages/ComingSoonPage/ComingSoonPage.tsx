import './ComingSoonPage.scss';
import WrapperPage from '../../components/WrapperPage/WrapperPage';
import ComingSoon from '../../components/ComingSoon/ComingSoon';

const ComingSoonPage = () => {
  return (
    <div className="coming-soonn-page">
      <WrapperPage>
        <div className="coming-soon-component">
          <ComingSoon />
        </div>
      </WrapperPage>
    </div>
  );
};

export default ComingSoonPage;
