import { useEffect, useState } from 'react';
import CustomInput from '../../../../components/CustomInput/CustomInput';
import WrapperForm from '../../../../components/WrapperForm/WrapperForm';
import { InputParams } from '../../../../interfaces';
import { CategoryTypeDto } from '../../../../interfaces/category';
import { NotificationParams } from '../../../../interfaces/notificationParams';

type Props = {
  selectedCategory?: CategoryTypeDto;
  formName: string;
  onClickExit?: React.MouseEventHandler<HTMLElement>;
  setShowNotification: React.Dispatch<React.SetStateAction<NotificationParams>>;
  onSave: () => void;
};

const FormManageCategory = (props: Props) => {
  const [isFullFill, setIsFullFill] = useState(false);
  const [category, setCategory] = useState<CategoryTypeDto>(props.selectedCategory || { id: '', name: '' });

  const handleChange = (inputParams: InputParams) => {
    if (inputParams.event) {
      const { value } = inputParams.event.target;
      setCategory({ ...category, name: value });
    }
  };

  useEffect(() => {
    if (category.name) {
      setIsFullFill(true);
    } else {
      setIsFullFill(false);
    }
  }, [category]);

  return (
    <WrapperForm
      name={props.formName}
      isFullFill={isFullFill}
      onClickExit={props.onClickExit}
      onClickCancel={props.onClickExit}
    >
      <div className="w-50 my-2">
        <CustomInput value={category.name} type="text" name="category" placeholder="Category" onChange={handleChange} />
      </div>
    </WrapperForm>
  );
};
export default FormManageCategory;
