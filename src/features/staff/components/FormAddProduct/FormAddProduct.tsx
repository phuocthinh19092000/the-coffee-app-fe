import WrapperForm from '../../../../components/WrapperForm/WrapperForm';
import './AddNewProduct.scss';
import CustomInput from '../../../../components/CustomInput/CustomInput';
import CustomSelect from '../../../../components/CustomSelect/CustomSelect';
import CustomUploadFile from '../../../../components/CustomUploadFile/CustomUploadFile';
import { useRef, useState } from 'react';

const FormAddProduct = () => {
  //TODO: Integrate API to get data of option select
  const data = ['1', '2', '3', '4', '5', '6'];
  const fileRef = useRef<HTMLInputElement>(null);

  const onClickBrowse = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const [isHavePreviewFile, setIsHavePreviewFile] = useState(false);

  return (
    <WrapperForm
      name="Add New Item"
      isHavePreviewFile={isHavePreviewFile}
      isFullFill={false}
      onClickBrowseAgain={onClickBrowse}
    >
      <div className="add-product">
        <div className="w-full h-fit">
          <CustomInput type="text" placeholder="Item Name" />
        </div>
        <div className="w-full h-fit">
          <CustomSelect listOptions={data} placeholder="Category" />
        </div>
        <div className="w-full h-fit">
          <CustomInput type="text" placeholder="Price" />
        </div>
        <div className="w-full h-fit">
          <CustomSelect listOptions={data} placeholder="Status" />
        </div>
      </div>
      <div className="area-upload-file">
        <CustomUploadFile setIsHavePreviewFile={setIsHavePreviewFile} fileRef={fileRef} onClickBrowse={onClickBrowse} />
      </div>
    </WrapperForm>
  );
};
export default FormAddProduct;
