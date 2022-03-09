import Exit from '../../../../share/assets/vector/Exit.svg';
import CustomSelect from '../../../../components/CustomSelect/CustomSelect';
import React from 'react';
import { useState } from 'react';
import { InputParams } from '../../../../interfaces';
import { listReason } from '../../../../constant/index';
import './PopUpConfirmCancelOrder.css';

type Props = {
  onClosePopUpConfirmCancel: React.Dispatch<React.SetStateAction<Boolean>>;
};

const PopUpConfirmCancelOrder = (props: Props) => {
  const [txtAreaValue, setTxtAreaValue] = useState('');
  const [dataReason, setDataReason] = useState({
    reason: '',
    description: '',
  });

  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTxtAreaValue(e.target.value);
    setDataReason({
      ...dataReason,
      description: e.target.value,
    });
  };

  const handleChange = (inputParams: InputParams) => {
    if (inputParams.body) {
      const name = inputParams.body.name;
      const value = inputParams.body.value;
      setDataReason({
        ...dataReason,
        [name]: value,
      });
    }
  };

  const closeFormCancelOrder = () => {
    props.onClosePopUpConfirmCancel(false);
  };

  const onCancelOrderHandler = () => {
    // TODO: CALL API CANCEL ORDER
    /**
     *  NOTICE: CHECK THE OTHER REASON
     **/
  };
  return (
    <>
      <div className="form-cancel-order">
        <div className="form-cancel-order__detail">
          <p className="text-style-vendor-h2">Confirmation</p>
          <img className="order-detail__title-btn-exit" src={Exit} alt="Exit Icon" onClick={closeFormCancelOrder} />
        </div>
        <div className="form-cancel-order__information ">
          <p className="text-style-vendor-body-1 mb-1.5">Are you sure you want to cancel this order?</p>
          <CustomSelect
            listOptions={listReason}
            placeholder="Reason"
            name="reason"
            onChange={handleChange}
            selectedValue={dataReason.reason}
          />
          {dataReason.reason === 'Other' ? (
            <textarea
              onChange={handleChangeTextArea}
              rows={3}
              className="form-cancel-order__reason mt-1.5"
              placeholder="Reason (Optional)"
              value={txtAreaValue}
            />
          ) : (
            ''
          )}
        </div>
        <div className="form-cancel-order__bottom">
          <button
            disabled={dataReason.reason !== '' ? false : true}
            className="bg-error text-white form-cancel-order__button-cancel mr-1"
            onClick={onCancelOrderHandler}
          >
            Cancel Order
          </button>
          <button className="bg-accent-3 text-error form-cancel-order__button-cancel" onClick={closeFormCancelOrder}>
            No
          </button>
        </div>
      </div>
    </>
  );
};

export default PopUpConfirmCancelOrder;
