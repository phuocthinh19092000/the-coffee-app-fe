import { useState, useRef, useEffect } from 'react';
import Product from '../Product/Product';
import WrapperPage from '../../components/WrapperPage/WrapperPage';
import Background from '../../components/Background/Background';
import Toast from '../../components/Toast/Toast';
import { TypeSearchItem } from '../../components/Header/Header';
import './HomePage.scss';
const ToastType = {
  success: 'success',
  fail: 'fail',
};

const HomePage = () => {
  const [showToast, setShowToast] = useState(false);
  const [searchDrink, setSearchDrink] = useState({} as TypeSearchItem);
  const toastRef = useRef({
    show() {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    },
  });

  const handleSearchPopup = (item: TypeSearchItem) => {
    setSearchDrink(item);
  };
  return (
    <div className="home-page">
      <WrapperPage handleSearchPopup={(item) => handleSearchPopup(item)}>
        <Toast message={'Order changes saved successfully!'} type={ToastType.success} ref={toastRef} />
        <Background />
        <Product searchDrink={searchDrink} />
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
