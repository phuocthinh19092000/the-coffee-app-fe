import WrapperForm from '../../../../components/WrapperForm/WrapperForm';
import './AddNewProduct.scss';
import CustomInput from '../../../../components/CustomInput/CustomInput';
import CustomSelect from '../../../../components/CustomSelect/CustomSelect';

const FormAddProduct = () => {
  //TODO: Integrate API to get data of option select
  const data = ['1', '2', '3', '4', '5', '6'];
  return (
    <WrapperForm name="Add New Item" haveImage={false} isFullFill={false}>
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
    </WrapperForm>
  );
};
export default FormAddProduct;
