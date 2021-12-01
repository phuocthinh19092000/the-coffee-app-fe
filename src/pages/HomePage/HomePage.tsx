import { useState, useRef, useEffect } from 'react';
import Product from '../Product/Product';
import WrapperPage from '../../components/WrapperPage/WrapperPage';
import Background from '../../components/Background/Background';
import Toast from '../../components/Toast/Toast';
import './HomePage.scss';
const ToastType = {
  success: 'success',
  fail: 'fail',
};

const HomePage = () => {
  const [showToast, setShowToast] = useState(false);

  const toastRef = useRef({
    show() {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    },
  });
  return (
    <div className="home-page">
      <WrapperPage>
        <Toast message={'Order changes saved successfully!'} type={ToastType.success} ref={toastRef} />
        <Background />
        <Product />
        <button
          className="home-page__btn--hidden"
          onClick={() => {
            toastRef.current.show();
          }}
        >
          Show Toast Notication
        </button>
      </WrapperPage>
    </div>
  );
};
export default HomePage;
