import './Dropdown.css';
import DropdownIcon from '../../share/assets/vector/Dropdown.svg';
import React, { useEffect, useState } from 'react';
import EditIcon from '../../share/assets/vector/IconEdit.svg';
import DeleteIcon from '../../share/assets/vector/DeleteIcon.svg';
import { ProductTypeDto, UserTypeDto } from '../../interfaces';
import useComponentVisible from '../../utils/useComponentVisible';
import FormManageProduct from '../../features/staff/components/FormManageProduct/FormManageProduct';
import { selectCategoryState } from '../../features/product/actions/getCategoryData';
import { useSelector } from 'react-redux';
import Category, { CategoryTypeDto } from '../../interfaces/category';
import { FormName } from '../../enum';
import ToastNotification from '../ToastNotification/ToatstNotification';
import { getProductsPagination } from '../../features/product/actions/getProductData';
import { useAppDispatch } from '../../storage/hooks';
import useClearNotification from '../../utils/useClearNotification';
type Props = {
  selectedValue: ProductTypeDto | UserTypeDto | CategoryTypeDto;
  startIndex: number;
};
function isProductTypeDto(object: ProductTypeDto | UserTypeDto | CategoryTypeDto): object is ProductTypeDto {
  return (object as ProductTypeDto).category !== undefined;
}
function isCategotyDto(object: ProductTypeDto | UserTypeDto | CategoryTypeDto): object is ProductTypeDto {
  return (object as CategoryTypeDto).name !== undefined;
}
function processingData(selectedValue: ProductTypeDto, listCategory: Category[]): ProductTypeDto {
  const categoryId = listCategory.find((item) => item.name === selectedValue.category)?.id;
  if (categoryId) {
    selectedValue.category = categoryId;
  }
  return selectedValue;
}
const limit = 15;

const Dropdown = (props: Props) => {
  const [ref, isComponentVisible, setIsComponentVisible] = useComponentVisible(false);
  const [isShowFormEdit, setIsShowFormEdit] = useState(false);
  const [isShowPopupDelete, setIsShowPopupDelete] = useState(false);

  const dispatch = useAppDispatch();
  const [typeShowNotification, setTypeShowNotification] = useClearNotification();

  const categories = useSelector(selectCategoryState);
  const listOptionsCategories = categories.map((item) => ({ id: item.id, name: item.name }));

  const showDropdown = () => {
    setIsComponentVisible(!isComponentVisible);
  };
  const showFormEdit = () => {
    setIsShowFormEdit(!isShowFormEdit);
  };
  const showPopupDelete = () => {
    setIsShowPopupDelete(!isShowPopupDelete);
  };

  useEffect(() => {
    if (isShowFormEdit || isShowPopupDelete) {
      setIsComponentVisible(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShowFormEdit, isShowPopupDelete]);

  const onUpdateProduct = () => {
    setIsShowFormEdit(false);
    dispatch(getProductsPagination({ limit, offset: props.startIndex - 1 }));
  };
  return (
    <div ref={ref}>
      <div className="dropdown">
        <div className="dropdown__icon" onClick={showDropdown}>
          <img src={DropdownIcon} alt="Dropdown" />
        </div>
        {isComponentVisible && (
          <div className="dropdown__list">
            <div className="dropdown__list-group" onClick={showFormEdit}>
              <img src={EditIcon} alt="" className="mr-1.5" />
              <p>Edit</p>
            </div>
            {/*TODO: show Popup delete*/}
            {/*<div className="dropdown__list-group text-error" onClick={showPopupDelete}>*/}
            <div className="hidden" onClick={showPopupDelete}>
              <img src={DeleteIcon} alt="" className="mr-1.5" />
              <p>Delete</p>
            </div>
          </div>
        )}
        {isProductTypeDto(props.selectedValue) && isShowFormEdit && (
          <FormManageProduct
            formName={FormName.UPDATE_ITEM}
            onClickExit={showFormEdit}
            selectedProduct={processingData(props.selectedValue, categories)}
            listCategory={listOptionsCategories}
            onSave={onUpdateProduct}
            setShowNotification={setTypeShowNotification}
          />
        )}
        {
          isCategotyDto(props.selectedValue) && isShowFormEdit
          // TODO:Show form edit category
        }

        {/* //TODO: show pop-up delete  */}

        {typeShowNotification.message && (
          <ToastNotification type={typeShowNotification.type} message={typeShowNotification.message} />
        )}
      </div>
    </div>
  );
};
export default Dropdown;
