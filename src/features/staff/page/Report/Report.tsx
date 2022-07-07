import Table from '../../../../components/Table/Table';
import CustomPagination from '../../../../components/CustomPagination/CustomPagination';
import { TableReportHeader } from '../../../../components/Table/constants/table.constant';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../../storage/hooks';
import { useSelector } from 'react-redux';
import { selectOrderByDateState, getOrderByDate } from '../../../order/actions/getOrderByDate';
import DatePicker from 'react-date-picker';
import './Report.scss';
import AddButton from '../../../../components/AddButton/AddButton';
import DownloadIcon from '../../../../share/assets/vector/Download.svg';
import Order, { OrderReportType } from '../../../../interfaces/order';
import { getOrderByDateParams } from '../../../order/api/orderParams';
import { moneyFormat } from '../../../../utils/MoneyFormat';
import moment from 'moment';
const limit = 15;

const processDownLoadData = (data: OrderReportType[]) => {
  let blobData = '';
  blobData += TableReportHeader.join(',');
  data.forEach((row, indx) => {
    const copyData = { ...row };
    delete copyData['id'];
    // copyData.createAt = moment(copyData.createAt).format('DD/MM/YYYY HH:mm').toString();
    blobData += '\n' + [indx + 1, ...Object.values(copyData)].join(',');
  });

  return blobData;
};

const prepareDataTableReport = (listOrder: Order[]) => {
  const data: OrderReportType[] = [];
  listOrder.map((order) => {
    const dataReportTable = {
      id: order.id,
      createAt: moment(order.createdAt).format('DD-MMM-YYYY HH:mm').toString(),
      user: order.user.name,
      product: order.product.name,
      quantity: order.quantity,
      orderStatus: order.orderStatus.name.toUpperCase(),
      price: order.productPrice * order.quantity,
      outOfRange: order.quantityBilled * order.productPrice,
    };
    data.push(dataReportTable);
  });
  return data;
};

const Report = () => {
  const dispatch = useAppDispatch();
  const orderByDate = useSelector(selectOrderByDateState);
  const [activeTag, setActiveTag] = useState('Date');
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const [listAllOrder, setListAllOrder] = useState([] as OrderReportType[]);

  const [isLastPage, setIsLastPage] = useState(false);
  const [isFirstPage, setIsFirstPage] = useState(true);

  const [startIndex, setStartIndex] = useState(1);
  const [lastIndex, setLastIndex] = useState(0);

  useEffect(() => {
    const param: getOrderByDateParams = {
      type: activeTag,
      from: dateFrom,
      to: null,
      pagination: { limit, offset: 0 },
    };
    if (activeTag === 'Range') param.to = dateTo;
    const getData = async (param: getOrderByDateParams) => {
      const allOrder = await dispatch(getOrderByDate({ code: 'all', ...param })).unwrap();
      setListAllOrder(prepareDataTableReport(allOrder.listOrder as Order[]));
      const dataListOrder = await dispatch(getOrderByDate(param)).unwrap();
      const isCheckLastPage = dataListOrder.totalOrder <= limit;
      setIsLastPage(isCheckLastPage);
      setLastIndex(dataListOrder.listOrder.length);
    };

    getData(param);
  }, [activeTag, dateFrom, dateTo]);

  const getData = (offset: number) => {
    const param: getOrderByDateParams = { type: activeTag, from: dateFrom, to: null, pagination: { limit, offset } };
    if (activeTag === 'Range') param.to = dateTo;
    dispatch(getOrderByDate(param));
  };

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
      // setOffset(lastIndex);
      getData(lastIndex);
      return;
    }

    setStartIndex(startIndex + limit);
    setLastIndex(lastIndex + limit);
    // setOffset(startIndex + limit - 1);
    getData(startIndex + limit - 1);
  };

  const onClickMovePreviousPage = () => {
    if (isFirstPage) {
      return;
    }

    if (isLastPage) {
      setStartIndex(startIndex - limit);
      setLastIndex(startIndex - 1);
      setIsLastPage(false);
      // setOffset(startIndex - limit - 1);
      getData(startIndex - limit - 1);

      if (startIndex - limit === 1) {
        setIsFirstPage(true);
      }

      return;
    }
    setStartIndex(startIndex - limit);
    setLastIndex(lastIndex - limit);
    getData(startIndex - limit - 1);

    if (startIndex - limit === 1) {
      setIsFirstPage(true);
      return;
    }
  };

  const handleChangeTab = (tab: string) => {
    if (activeTag === tab) return;
    if (tab === 'Range') {
      setDateTo(new Date());
    }
    setActiveTag(tab);
    setStartIndex(1);
    setIsFirstPage(true);
    setDateFrom(new Date());
  };

  const handleDownloadExcel = () => {
    const data = processDownLoadData(listAllOrder);
    // eslint-disable-next-line no-console
    console.log(data);
    const blobData = new Blob(['\uFEFF' + data], { type: 'text/csv; charset=utf-18' });
    const url = window.URL.createObjectURL(blobData);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${new Date()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();

    // const worksheet = utils.json_to_sheet(listAllOrder);
    // utils.book_append_sheet(file, worksheet);
    // writeFile(file, './test.xlsx');
  };

  return (
    <>
      <div className="list-product">
        <div className="list-product-header items-center">
          <div className="tab-list">
            {['Date', 'Month', 'Range'].map((tab) => (
              <p
                key={tab}
                className={activeTag === tab ? `filter-tag--active` : `filter-tag`}
                onClick={() => handleChangeTab(tab)}
              >
                By {tab}
              </p>
            ))}
          </div>
          <AddButton name="Download as CSV" icon={DownloadIcon} onClick={handleDownloadExcel} />
        </div>
        <div className="list-product-header">
          <div className="flex">
            <DatePicker
              className="react-date-picker"
              calendarClassName="react-calendar"
              maxDetail={activeTag === 'Month' ? 'year' : 'month'}
              clearIcon={null}
              maxDate={dateTo}
              value={dateFrom}
              onChange={(date: Date) => setDateFrom(date)}
              format={activeTag === 'Month' ? 'yyyy--MM' : 'yyyy--MM--dd'}
            />
            {activeTag === 'Range' && (
              <DatePicker
                className="react-date-picker ml-1"
                calendarClassName="react-calendar"
                clearIcon={null}
                minDate={dateFrom}
                value={dateTo}
                onChange={(date: Date) => setDateTo(date)}
                format="yyyy--MM--dd"
              />
            )}
          </div>
          <CustomPagination
            startIndex={startIndex}
            endIndex={lastIndex}
            totalItems={orderByDate.totalOrder || 0}
            isLastPage={isLastPage}
            isFirstPage={isFirstPage}
            onClickNextPage={() => onClickMoveNextPage(orderByDate.totalOrder)}
            onClickPreviousPage={onClickMovePreviousPage}
          />
        </div>
        {!!orderByDate.totalOrder && (
          <div className="flex justify-between mt-1 mb-0.5 mx-1">
            <p>Total Amount: {moneyFormat(listAllOrder.reduce((acc, it) => (acc += it.price), 0))}</p>
            <p>Out of Range: {moneyFormat(listAllOrder.reduce((acc, it) => (acc += it.outOfRange), 0))}</p>
            {/* <p>Best Drink: </p> */}
          </div>
        )}
        <div className="list-product-table">
          <Table
            header={TableReportHeader}
            body={prepareDataTableReport(orderByDate.listOrder)}
            startIndex={startIndex}
          />
        </div>
      </div>
    </>
  );
};

export default Report;
