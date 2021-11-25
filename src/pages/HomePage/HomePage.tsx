import { useState, useRef, useEffect } from 'react';
import Product from '../Product/Product';
import WrapperPage from '../../components/WrapperPage/WrapperPage';
import Background from '../../components/Background/Background';
import Toast from '../../components/Toast/Toast';

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
    <>
      <Toast message={'Order changes saved successfully!'} type={ToastType.success} ref={toastRef} />
      <WrapperPage />
      <Background />
      <Product />
      <button
        onClick={() => {
          toastRef.current.show();
        }}
      >
        Show Toast Notication
      </button>
    </>
  );
};
export default HomePage;
