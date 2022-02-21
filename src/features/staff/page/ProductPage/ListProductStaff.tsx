import AddButton from '../../../../components/AddButton/AddButton';
import Table from '../../../../components/Table/Table';
import CustomPagination from '../../../../components/CustomPagination/CustomPagination';
import Product from '../../../../interfaces/product';
import { ProductTable } from '../../../../interfaces';
import { TableProductHeader } from '../../../../components/Table/constants/table.constant';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../../storage/hooks';
import { useSelector } from 'react-redux';
import { getProductsPagination, selectProductState } from '../../../product/actions/getProductData';

import './ListProductStaff.scss';

const limit = 15;

const prepareDataTableProduct = (listProducts: Product[]): ProductTable[] => {
  const data: ProductTable[] = [];

  listProducts.forEach((product) => {
    const { description, ...rest } = product;
    const dataProductTable = { ...rest, category: rest.category.name };
    let objectOrder: ProductTable = {
      id: '',
      name: '',
      images: '',
      category: '',
      price: 0,
      status: '',
    };
    const reOrderDataProductTable: ProductTable = Object.assign(objectOrder, dataProductTable);
    data.push(reOrderDataProductTable);
  });

  return data;
};

const ListProductStaff = () => {
  const dispatch = useAppDispatch();
  const responseDataProduct = useSelector(selectProductState);

  const [isLastPage, setIsLastPage] = useState(false);
  const [isFirstPage, setIsFirstPage] = useState(true);

  const [startIndex, setStartIndex] = useState(1);
  const [lastIndex, setLastIndex] = useState(0);

  useEffect(() => {
    async function getData() {
      const dataProduct = await dispatch(getProductsPagination({ limit })).unwrap();
      const isCheckLastPage = dataProduct.products.totalProducts <= limit;

      setIsLastPage(isCheckLastPage);
      setLastIndex(dataProduct.products.length);
    }

    getData();
  }, [dispatch]);

  const totalProducts = responseDataProduct.totalProduct;
  const listProducts = responseDataProduct.products;

  const dataTableProduct: ProductTable[] = prepareDataTableProduct(listProducts);

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

  return (
    <>
      <div className="list-product">
        <div className="list-product-header">
          <AddButton name="Add Item" />
          {/* //TODO: Add component input here */}
          <CustomPagination
            startIndex={startIndex}
            endIndex={lastIndex}
            totalItems={totalProducts || 0}
            onClickNextPage={() => onClickMoveNextPage(totalProducts)}
            onClickPreviousPage={() => onClickMovePreviousPage()}
          />
        </div>

        <div className="list-product-table">
          <Table header={TableProductHeader} body={dataTableProduct} isHaveDropdown={true} startIndex={startIndex} />
        </div>
      </div>
    </>
  );
};

export default ListProductStaff;
