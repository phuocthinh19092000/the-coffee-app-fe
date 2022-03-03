import CustomInput from '../../../components/CustomInput/CustomInput';
import CustomSelect from '../../../components/CustomSelect/CustomSelect';
import WrapperForm from '../../../components/WrapperForm/WrapperForm';
import { freeUnit, listRole, listStatusEmployee } from '../constant';
import { InputParams, NotificationParams, UserTypeDto } from '../../../interfaces';
import React, { useEffect, useState } from 'react';
import './FormManageAccount.css';
import { useAppDispatch } from '../../../storage/hooks';
import { createAccount } from '../actions/createAccountData';
import { statusCodeError } from '../../../constant';
import { NotificationType } from '../../../enum';
import { startCase } from 'lodash';

type Props = {
  selectedAccount?: UserTypeDto;
  formName: string;
  onClickExit?: React.MouseEventHandler<HTMLElement>;
  onSave: () => void;
  setShowNotification: React.Dispatch<React.SetStateAction<NotificationParams>>;
};

const FormManageAccount = (props: Props) => {
  const [dataAccount, setDataAccount] = useState<UserTypeDto>(
    props.selectedAccount || {
      name: '',
      available: '',
      phoneNumber: '',
      email: '',
      role: '',
      freeUnit: 0,
    },
  );
  const [isFullFill, setIsFullFill] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const {phoneNumber, ...rest} = dataAccount;
    if (Object.values(rest).every(Boolean)) {
      setIsFullFill(true);
    } else {
      setIsFullFill(false);
    }
  }, [dataAccount]);

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

    setDataAccount({
      ...dataAccount,
      [name]: value,
    });
  };

  const setContentNotification = (message: string, response: any) => {
    if (statusCodeError.includes(response.payload?.statusCode)) {
      props.setShowNotification({
        type: NotificationType.FAILURE,
        message: response.payload.message,
      });
    } else {
      props.setShowNotification({ message, type: NotificationType.SUCCESS });
      props.onSave();
    }
  };

  const onSaveDataHandler = async () => {
    if (!isFullFill) {
      return;
    }

    dataAccount.email = dataAccount.email.trim();
    dataAccount.name = startCase(dataAccount.name);

    if (dataAccount.id) {
      //TODO:  update information account
    } else {
      const response = await dispatch(createAccount(dataAccount));
      setContentNotification('New Account added successfully!', response);
    }
  };
  return (
    <WrapperForm
      name={props.formName}
      isFullFill={isFullFill}
      onClickSave={onSaveDataHandler}
      onClickExit={props.onClickExit}
      onClickCancel={props.onClickExit}
    >
      <div className="add-account">
        <div className="w-full h-fit">
          <CustomInput
            type="text"
            name="name"
            placeholder="Account Name"
            onChange={handleChange}
            value={dataAccount.name}
          />
        </div>
        <div className="w-full h-fit">
          <CustomSelect
            listOptions={listStatusEmployee}
            placeholder="Status"
            name="available"
            onChange={handleChange}
            selectedValue={dataAccount.available}
          />
        </div>
        <div className="w-full h-fit">
          <CustomInput
            type="text"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            value={dataAccount.email}
          />
        </div>
        <div className="w-full h-fit">
          <CustomSelect
            listOptions={freeUnit}
            placeholder="Daily Unit"
            name="freeUnit"
            onChange={handleChange}
            selectedValue={dataAccount.freeUnit}
          />
        </div>
        <div className="w-full h-fit">
          <CustomInput
            type="number"
            name="phoneNumber"
            placeholder="Phone Number"
            onChange={handleChange}
            value={dataAccount.phoneNumber}
          />
        </div>
        <div className="w-full h-fit">
          <CustomSelect
            listOptions={listRole}
            placeholder="Role"
            name="role"
            onChange={handleChange}
            selectedValue={dataAccount.role}
          />
        </div>
      </div>
    </WrapperForm>
  );
};

export default FormManageAccount;
