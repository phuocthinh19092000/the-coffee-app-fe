import AddButton from '../../../../components/AddButton/AddButton';
import Table from '../../../../components/Table/Table';
import CustomPagination from '../../../../components/CustomPagination/CustomPagination';
import FormManageProduct from '../../components/FormManageProduct/FormManageProduct';
import ToastNotification from '../../../../components/ToastNotification/ToatstNotification';
import { FormName } from '../../../../enum';
import { Product, ProductTypeDto } from '../../../../interfaces';
import { TableProductHeader } from '../../../../components/Table/constants/table.constant';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../../storage/hooks';
import { useSelector } from 'react-redux';
import { getProductsPagination, selectProductState } from '../../../product/actions/getProductData';
import { NotificationType, PositionToast } from '../../../../enum';
import { getAllCategory, selectCategoryState } from '../../../product/actions/getCategoryData';

import './ListProductStaff.scss';

const limit = 15;
const timeoutShowNotification = 3000;

const prepareDataTableProduct = (listProducts: Product[]): ProductTypeDto[] => {
  const data: ProductTypeDto[] = [];

  // eslint-disable-next-line array-callback-return
  listProducts.map((product) => {
    const { description, ...rest } = product;
    const dataProductTable = { ...rest, category: rest.category.name };
    let objectOrder: ProductTypeDto = {
      id: '',
      name: '',
      images: '',
      category: '',
      price: 0,
      status: '',
    };
    const reOrderDataProductTable: ProductTypeDto = Object.assign(objectOrder, dataProductTable);
    data.push(reOrderDataProductTable);
  });

  return data;
};

const ListProductStaff = () => {
  const dispatch = useAppDispatch();
  const responseDataProduct = useSelector(selectProductState);
  const categoryData = useSelector(selectCategoryState);

  const [isShowNotification, setIsShowNotification] = useState(false);

  const [isShowFormAddNewProduct, setIsShowFormAddNewProduct] = useState(false);

  const [isLastPage, setIsLastPage] = useState(false);
  const [isFirstPage, setIsFirstPage] = useState(true);

  const [startIndex, setStartIndex] = useState(1);
  const [lastIndex, setLastIndex] = useState(0);

  useEffect(() => {
    async function getData() {
      const dataProduct = await dispatch(getProductsPagination({ limit })).unwrap();
      const isCheckLastPage = dataProduct.totalProducts <= limit;

      setIsLastPage(isCheckLastPage);
      setLastIndex(dataProduct.products.length);
    }

    getData();
  }, [dispatch]);

  const totalProducts = responseDataProduct.totalProduct;
  const listProducts = responseDataProduct.products;

  const dataTableProduct: ProductTypeDto[] = prepareDataTableProduct(listProducts);

  const onClickMoveNextPage = (total: number) => {
    if (isLastPage) {
      return;
    }

    if (isFirstPage) {
      setIsFirstPage(false);
    }

    if (lastIndex + limit >= total) {
      setStartIndex(lastIndex + 1);
      setLastIndex(total);
      setIsLastPage(true);
      dispatch(getProductsPagination({ limit, offset: lastIndex }));
      return;
    }

    setStartIndex(startIndex + limit);
    setLastIndex(lastIndex + limit);
    dispatch(getProductsPagination({ limit, offset: startIndex + limit - 1 }));
  };

  const onClickMovePreviousPage = () => {
    if (isFirstPage) {
      return;
    }

    if (isLastPage) {
      setStartIndex(startIndex - limit);
      setLastIndex(startIndex - 1);
      setIsLastPage(false);
      dispatch(getProductsPagination({ limit, offset: startIndex - limit - 1 }));

      if (startIndex - limit === 1) {
        setIsFirstPage(true);
      }

      return;
    }
    setStartIndex(startIndex - limit);
    setLastIndex(lastIndex - limit);
    dispatch(getProductsPagination({ limit, offset: startIndex - limit - 1 }));

    if (startIndex - limit === 1) {
      setIsFirstPage(true);
      return;
    }
  };

  const onShowFormAddNewProductHandler = () => {
    dispatch(getAllCategory());

    setIsShowFormAddNewProduct(true);
  };

  const onClickExit = () => {
    setIsShowFormAddNewProduct(false);
  };

  const onAddNewProductHandler = () => {
    dispatch(getProductsPagination({ limit, offset: startIndex - 1 }));
    setIsShowFormAddNewProduct(false);
    onClickExit();
    setTimeout(() => {
      setIsShowNotification(false);
    }, timeoutShowNotification);
  };

  return (
    <>
      <div className="list-product">
        <div>
          <div className="list-product-header">
            <div className="list-product-header__item">
              <AddButton name="Add Item" onClick={onShowFormAddNewProductHandler} />
              {/* //TODO: Add component input here */}
            </div>
            <CustomPagination
              startIndex={startIndex}
              endIndex={lastIndex}
              totalItems={totalProducts || 0}
              onClickNextPage={() => onClickMoveNextPage(totalProducts)}
              onClickPreviousPage={onClickMovePreviousPage}
            />
          </div>

          <div className="list-product-table">
            <Table header={TableProductHeader} body={dataTableProduct} isHaveDropdown={true} startIndex={startIndex} />
          </div>
        </div>
      </div>
      {isShowFormAddNewProduct && (
        <FormManageProduct
          listCategory={categoryData}
          formName={FormName.ADD_ITEM}
          onSave={onAddNewProductHandler}
          onClickExit={onClickExit}
        />
      )}

      {isShowNotification && (
        <ToastNotification
          type={NotificationType.SUCCESS}
          message="New Item Added Successfully"
          position={PositionToast.TOP_CENTER}
        />
      )}
    </>
  );
};

export default ListProductStaff;
