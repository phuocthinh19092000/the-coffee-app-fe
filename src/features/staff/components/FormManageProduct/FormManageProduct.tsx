import WrapperForm from '../../../../components/WrapperForm/WrapperForm';
import CustomInput from '../../../../components/CustomInput/CustomInput';
import CustomSelect from '../../../../components/CustomSelect/CustomSelect';
import CustomUploadFile from '../../../../components/CustomUploadFile/CustomUploadFile';
import Category from '../../../../interfaces/category';

import { useEffect, useRef, useState } from 'react';
import { InputParams, ProductTypeDto } from '../../../../interfaces';
import { ProductStatusList } from '../../../../constant';
import { useAppDispatch } from '../../../../storage/hooks';
import { getAllCategory, selectCategoryState } from '../../../product/actions/getCategoryData';
import { useSelector } from 'react-redux';
import { createProduct } from '../../../product/actions/createProductData';

type Props = {
  selectedProduct?: ProductTypeDto;
  listCategory: string[];
  formName: string;
  onClickExit?: React.MouseEventHandler<HTMLElement>;
  onSave: () => void;
};

const statusCodeError = [400];

const FormManageProduct = (props: Props) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllCategory()).unwrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const categories = useSelector(selectCategoryState);

  const listOptionsCategories: string[] = categories.map((item) => item.name);

  const fileRef = useRef<HTMLInputElement>(null);
  const [isHavePreviewFile, setIsHavePreviewFile] = useState(false);
  const [isFullFill, setIsFullFill] = useState(false);

  const [dataProduct, setDataProduct] = useState<ProductTypeDto>(
    props.selectedProduct || {
      name: '',
      category: '',
      price: 0,
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

  const onSaveDataHandler = async () => {
    if (!isFullFill) {
      return;
    }

    const { id, category, ...rest } = dataProduct;
    const prepareDataAddNewProduct = {
      ...rest,
      categoryId: dataProduct.category,
      price: dataProduct.price.toString(),
    };

    const dataForm = new FormData();
    Object.entries(prepareDataAddNewProduct).forEach((obj) => {
      const key = obj[0];
      const value = obj[1];
      dataForm.append(key, value);
    });

    const responseDataAddNewProduct = await dispatch(createProduct(dataForm));

    if (statusCodeError.includes(responseDataAddNewProduct.payload?.data?.status)) {
      alert(responseDataAddNewProduct.payload.data.description);
    } else {
      props.onSave();
    }
  };

  const listCategoryId: string[] = [];
  const listNameCategory: string[] = [];
  props.listCategory.forEach((category) => {
    listCategoryId.push(category.id);
    listNameCategory.push(category.name);
  });
  return (
    <WrapperForm
      name={props.formName}
      isHavePreviewFile={isHavePreviewFile}
      isFullFill={isFullFill}
      onClickBrowseAgain={onClickBrowse}
      onClickSave={onSaveDataHandler}
      onClickExit={props.onClickExit}
      onClickCancel={props.onClickExit}
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
            listOptions={listOptionsCategories}
            placeholder="Category"
            name="category"
            onChange={handleChange}
            selectedValue={dataProduct.category}
          />
        </div>
        <div className="w-full h-fit">
          <CustomInput
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            value={dataProduct.price}
          />
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
          name="images"
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
