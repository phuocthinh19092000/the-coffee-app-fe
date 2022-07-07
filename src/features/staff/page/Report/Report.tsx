import Table from '../../../../components/Table/Table';
import CustomPagination from '../../../../components/CustomPagination/CustomPagination';
import { Product, ProductTypeDto } from '../../../../interfaces';
import { TableReportHeader } from '../../../../components/Table/constants/table.constant';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../../storage/hooks';
import { useSelector } from 'react-redux';
import { getProductsPagination, selectProductState } from '../../../product/actions/getProductData';
import DatePicker from 'react-date-picker';
import './Report.scss';
import axios from 'axios';
import AddButton from '../../../../components/AddButton/AddButton';
import DownloadIcon from '../../../../share/assets/vector/Download.svg';
const limit = 15;

const prepareDataTableProduct = (listProducts: Product[]): ProductTypeDto[] => {
  const data: ProductTypeDto[] = [];

  // eslint-disable-next-line array-callback-return
  listProducts.map((product) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { description, ...rest } = product;
    const dataProductTable = { ...rest, category: rest.category.name };
    const objectOrder: ProductTypeDto = {
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

const Report = () => {
  const dispatch = useAppDispatch();
  const responseDataProduct = useSelector(selectProductState);
  const [activeTag, setActiveTag] = useState('Date');
  const [date, setDate] = useState(new Date());

  const [isLastPage, setIsLastPage] = useState(false);
  const [isFirstPage, setIsFirstPage] = useState(true);

  const [startIndex, setStartIndex] = useState(1);
  const [lastIndex, setLastIndex] = useState(0);

  useEffect(() => {
    async function getData() {
      const dataProduct = await dispatch(getProductsPagination({ limit })).unwrap();
      const isCheckLastPage = dataProduct.totalProduct <= limit;
      setIsLastPage(isCheckLastPage);
      setLastIndex(dataProduct.products.length);
    }

    getData();
  }, []);

  useEffect(() => {
    // eslint-disable-next-line no-console

    const tomorrow = new Date(date);
    // eslint-disable-next-line no-console
    console.log(activeTag);
    if (activeTag === 'Date') {
      const tomorrow = new Date(date);
      tomorrow.setDate(tomorrow.getDate() + 1);
    } else if (activeTag === 'Month') {
      const tomorrow = new Date(date);
      tomorrow.setDate(tomorrow.getMonth() + 1);
    }

    const param = { from: date, to: tomorrow };
    // eslint-disable-next-line no-console
    console.log(param);
    // axios
    //   .get('http://localhost:8080/orders/date-range', { params: { date: param } })
    //   .then((response) => {
    //     // eslint-disable-next-line no-console
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     // eslint-disable-next-line no-console
    //     console.log(error);
    //   });
  }, [date]);

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

  const handlechangeTab = (tab: string) => {
    setActiveTag(tab);
    setDate(new Date());
  };

  return (
    <>
      <div className="list-product">
        <div className="list-product-header items-center">
          <div className="tab-list">
            {['Date', 'Month', 'Range'].map((tab) => (
              <p
                className={activeTag === tab ? `filter-tag--active` : `filter-tag`}
                onClick={() => handlechangeTab(tab)}
              >
                By {tab}
              </p>
            ))}
          </div>
          <AddButton name="Download as CSV" icon={DownloadIcon} />
        </div>
        <div className="list-product-header">
          <div className="flex">
            <DatePicker
              className="react-date-picker"
              calendarClassName="react-calendar"
              maxDetail={activeTag === 'Month' ? 'year' : 'month'}
              clearIcon={null}
              value={date}
              onChange={(date: Date) => setDate(date)}
              format={activeTag === 'Month' ? 'yyyy--MM' : 'yyyy--MM--dd'}
            />
            {activeTag === 'Range' && (
              <DatePicker
                className="react-date-picker ml-1"
                calendarClassName="react-calendar"
                clearIcon={null}
                value={date}
                onChange={(date: Date) => setDate(date)}
                format="yyyy--MM--dd"
              />
            )}
          </div>
          <CustomPagination
            startIndex={startIndex}
            endIndex={lastIndex}
            totalItems={totalProducts || 0}
            isLastPage={isLastPage}
            isFirstPage={isFirstPage}
            onClickNextPage={() => onClickMoveNextPage(totalProducts)}
            onClickPreviousPage={onClickMovePreviousPage}
          />
        </div>
        <div className="flex justify-between mt-1 mb-0.5">
          <p>Total Amount</p>
          <p>Total Amount</p>
          <p>Total Amount</p>
        </div>
        <div className="list-product-table">
          <Table header={TableReportHeader} body={dataTableProduct} isHaveDropdown={true} startIndex={startIndex} />
        </div>
      </div>
    </>
  );
};

export default Report;
