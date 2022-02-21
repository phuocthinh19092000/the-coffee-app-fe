import './Dropdown.scss';
import DropdownIcon from '../../share/assets/vector/Dropdown.svg';
import React, { useState } from 'react';
import EditIcon from '../../share/assets/vector/IconEdit.svg';
import DeleteIcon from '../../share/assets/vector/DeleteIcon.svg';
import { ProductTypeDto, UserTypeDto } from '../../interfaces';
import useComponentVisible from '../../utils/useComponentVisible';
import FormManageProduct from '../../features/staff/components/FormManageProduct/FormManageProduct';

type Props = {
  selectedValue: ProductTypeDto | UserTypeDto;
};
function isProductTypeDto(object: ProductTypeDto | UserTypeDto): object is ProductTypeDto {
  return (object as ProductTypeDto).category !== undefined;
}

const Dropdown = (props: Props) => {
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

  const [isShowFormEdit, setIsShowFormEdit] = useState(false);
  const [isShowPopupDelete, setIsShowPopupDelete] = useState(false);

  const showDropdown = () => {
    setIsComponentVisible(!isComponentVisible);
  };
  const showFormEdit = () => {
    setIsShowFormEdit(!isShowFormEdit);
  };
  const showPopupDelete = () => {
    setIsShowPopupDelete(!isShowPopupDelete);
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
            <div className="dropdown__list-group text-error" onClick={showPopupDelete}>
              <img src={DeleteIcon} alt="" className="mr-1.5" />
              <p>Delete</p>
            </div>
          </div>
        )}
        {isProductTypeDto(props.selectedValue) && isShowFormEdit && (
          <FormManageProduct
            formName={'Edit New Item'}
            onClickExit={showFormEdit}
            selectedProduct={props.selectedValue}
          />
        )}

        {/* //TODO: show pop-up delete  */}
      </div>
    </div>
  );
};
export default Dropdown;
