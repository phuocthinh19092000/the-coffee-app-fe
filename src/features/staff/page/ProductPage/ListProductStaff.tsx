import AddButton from '../../../../components/AddButton/AddButton';
import Table from '../../../../components/Table/Table';
import CustomPagination from '../../../../components/CustomPagination/CustomPagination';
import BlackCoffee from '../../../../share/assets/img/blackcoffee.png';
import { ProductTable } from '../../../../interfaces';
import { TableProductHeader } from '../../../../components/Table/constants/table.constant';
import { useState } from 'react';

import './ListProductStaff.scss';

const limit = 15;

const ListProductStaff = () => {
  // Replace totalProducts above here with total of products
  const totalProducts = 0;

  const [dataTable, setDataTable] = useState<ProductTable[]>([]);

  const isCheckLastPage = totalProducts <= limit ? true : false;

  const [isLastPage, setIsLastPage] = useState(isCheckLastPage);
  const [isFirstPage, setIsFirstPage] = useState(true);

  const [startIndex, setStartIndex] = useState(1);

  const lastIdx = isCheckLastPage ? dataTable.length : limit;
  const [lastIndex, setLastIndex] = useState(lastIdx);

  // Dispatch action api to get total of products and replace here totalProducts here

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
      /** Dispatch action to call api get list product above here with:
       * limit: limit in line 11
       * offset: lastIndex
       **/

      return;
    }

    setStartIndex(startIndex + limit);
    setLastIndex(lastIndex + limit);
    /** Dispatch action to call api get list product above here with:
     * limit: limit in line 11
     * offset: startIndex + limit
     **/
  };

  const onClickMovePreviousPage = (total: number) => {
    if (isFirstPage) {
      return;
    }

    if (isLastPage) {
      setStartIndex(startIndex - limit);
      setLastIndex(startIndex - 1);
      setIsLastPage(false);
      /** Dispatch action to call api get list product above here with:
       * limit: limit in line 11
       * offset: startIndex - limit
       **/

      if (startIndex - limit === 1) {
        setIsFirstPage(true);
      }

      return;
    }
    setStartIndex(startIndex - limit);
    setLastIndex(lastIndex - limit);
    /** Dispatch action to call api get list product above here with:
     * limit: limit in line 11
     * offset: startIndex - limit
     **/

    if (startIndex - limit === 1) {
      setIsFirstPage(true);
      return;
    }
  };

  return (
    <>
      <div className="list-product">
        <div>
          <div className="list-product-header">
            <div className="list-product-header__item">
              <AddButton name="Add Item" />
              {/* //TODO: Add component input here */}
            </div>
            <CustomPagination
              startIndex={startIndex}
              endIndex={lastIndex}
              totalItems={totalProducts || 0}
              onClickNextPage={() => onClickMoveNextPage(totalProducts)}
              onClickPreviousPage={() => onClickMovePreviousPage(totalProducts)}
            />
          </div>

          <div className="list-product-table">
            <Table header={TableProductHeader} body={dataTable} isHaveDropdown={true} startIndex={startIndex} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ListProductStaff;
