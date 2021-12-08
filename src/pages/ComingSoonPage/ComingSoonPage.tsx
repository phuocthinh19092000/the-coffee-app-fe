import './ComingSoonPage.scss';
import WrapperPage from '../../components/WrapperPage/WrapperPage';
import ComingSoon from '../../components/ComingSoon/ComingSoon';

const ComingSoonPage = () => {
  return (
    <>
      <WrapperPage>
        <div className="coming-soon-component">
          <ComingSoon />
        </div>
      </WrapperPage>
    </>
  );
};

export default ComingSoonPage;
