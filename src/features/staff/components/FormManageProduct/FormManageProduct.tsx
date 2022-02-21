import WrapperForm from '../../../../components/WrapperForm/WrapperForm';
import './FormManageProduct.scss';
import CustomInput from '../../../../components/CustomInput/CustomInput';
import CustomSelect from '../../../../components/CustomSelect/CustomSelect';
import CustomUploadFile from '../../../../components/CustomUploadFile/CustomUploadFile';
import { useEffect, useRef, useState } from 'react';
import { InputParams, ProductTypeDto } from '../../../../interfaces';
import { ProductStatusList } from '../../../../constant';

type Props = {
  selectedValue?: ProductTypeDto;
  listCategory?: string[];
  formName: string;
};

const FormManageProduct = (props: Props) => {
  //TODO: Integrate API to get data category of option select
  const data = ['Coffee', 'Ice Blended', 'Tea', 'Juice', 'Yogurt'];

  const fileRef = useRef<HTMLInputElement>(null);
  const [isHavePreviewFile, setIsHavePreviewFile] = useState(false);
  const [isFullFill, setIsFullFill] = useState(false);

  const [dataProduct, setDataProduct] = useState<ProductTypeDto>(
    props.selectedValue || {
      name: '',
      category: '',
      price: '',
      status: '',
    },
  );

  useEffect(() => {
    if (Object.values(dataProduct).every(Boolean)) {
      setIsFullFill(true);
    } else {
      setIsFullFill(false);
    }
  }, [dataProduct]);

  const onClickBrowse = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleChange = (inputParams: InputParams) => {
    let name: string = '';
    let value: string | number | File = '';

    if (inputParams.event) {
      name = inputParams.event.target.name;
      value = inputParams.event.target.value;
    } else if (inputParams.body) {
      name = inputParams.body.name;
      value = inputParams.body.value;
    }

    setDataProduct({
      ...dataProduct,
      [name]: value,
    });
  };

  return (
    <WrapperForm
      name={props.formName}
      isHavePreviewFile={isHavePreviewFile}
      isFullFill={isFullFill}
      onClickBrowseAgain={onClickBrowse}
    >
      <div className="add-product">
        <div className="w-full h-fit">
          <CustomInput
            type="text"
            name="name"
            placeholder="Item Name"
            onChange={handleChange}
            value={dataProduct.name}
          />
        </div>
        <div className="w-full h-fit">
          <CustomSelect
            listOptions={data}
            placeholder="Category"
            name="category"
            onChange={handleChange}
            selectedValue={dataProduct.category}
          />
        </div>
        <div className="w-full h-fit">
          <CustomInput type="text" name="price" placeholder="Price" onChange={handleChange} value={dataProduct.price} />
        </div>
        <div className="w-full h-fit">
          <CustomSelect
            listOptions={ProductStatusList}
            placeholder="Status"
            name="status"
            onChange={handleChange}
            selectedValue={dataProduct.status}
          />
        </div>
      </div>
      <div className="area-upload-file">
        <CustomUploadFile
          name="image"
          setIsHavePreviewFile={setIsHavePreviewFile}
          fileRef={fileRef}
          onClickBrowse={onClickBrowse}
          onChange={handleChange}
          selectedImage={dataProduct.images}
        />
      </div>
    </WrapperForm>
  );
};
export default FormManageProduct;
