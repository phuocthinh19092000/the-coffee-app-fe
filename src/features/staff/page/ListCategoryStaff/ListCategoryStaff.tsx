import { useEffect, useState } from 'react';
import AddButton from '../../../../components/AddButton/AddButton';
import CustomPagination from '../../../../components/CustomPagination/CustomPagination';
import { TableCategoryHeader } from '../../../../components/Table/constants/table.constant';
import Table from '../../../../components/Table/Table';
import { useAppDispatch } from '../../../../storage/hooks';
import useClearNotification from '../../../../utils/useClearNotification';
import { getAllCategory } from '../../../product/actions/getCategoryData';
const limit = 15;

const ListCategoryStaff = () => {
  const dispatch = useAppDispatch();
  const [isLastPage, setIsLastPage] = useState(false);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [startIndex, setStartIndex] = useState(1);
  const [lastIndex, setLastIndex] = useState(0);

  useEffect(() => {
    async function getData() {
      const dataCategory = await dispatch(getAllCategory({ limit })).unwrap();
      await dispatch(getAllCategory()).unwrap();
      const isCheckLastPage = dataCategory.totalCategories <= limit;
      setIsLastPage(isCheckLastPage);
      setLastIndex(dataCategory.products.length);
    }

    getData();
  }, [dispatch]);
  // TODO: After interrate API get all categories , i will remove this line
  const dataTableAccount = [
    { id: '1', name: 'Juice' },
    { id: '2', name: 'Juice' },
    { id: '3', name: 'Juice' },
    { id: '4', name: 'Juice' },
  ];
  return (
    <>
      <div className="list-account">
        <div className="list-account-header">
          <AddButton name="Add Category" />
          {/* //TODO: Add component input search here */}
          <CustomPagination
            startIndex={startIndex}
            endIndex={lastIndex}
            totalItems={100}
            isFirstPage={isFirstPage}
            isLastPage={isLastPage}
          />
        </div>

        <div className="list-account-table">
          <Table
            header={TableCategoryHeader}
            body={dataTableAccount}
            isHaveDropdown={true}
            startIndex={startIndex}
            className="text-center"
          />
        </div>
      </div>
    </>
  );
};

export default ListCategoryStaff;
