import React, { useEffect, useState } from 'react';
import { InputParams } from '../../interfaces';
import './CustomInput.scss';

interface Props {
  placeholder: string;
  type?: string;
  value?: string | number;
  name: string;
  onChange: (inputParam: InputParams) => void;
}
const CustomInput = (props: Props) => {
  const [outlinedText, setOutlinedText] = useState(props.value ? true : false);

  const handleOnFocus: React.FocusEventHandler<HTMLInputElement> = (event: React.FocusEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      event.target.placeholder = '';
    }
    setOutlinedText(true);
  };
  const handleOnBlur: React.FocusEventHandler<HTMLInputElement> = (event: React.FocusEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      event.target.placeholder = props.placeholder ? props.placeholder : '';
      setOutlinedText(false);
    } else {
      setOutlinedText(true);
    }
  };

  return (
    <div className="outlined-text-input">
      {outlinedText && (
        <label htmlFor="inputText" className="outlined-text-input__label">
          {props.placeholder}
        </label>
      )}
      <input
        className="form-control"
        placeholder={props.placeholder}
        name={props.name}
        type={props.type || 'text'}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        value={props.value || ''}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.onChange({ event })}
      />
    </div>
  );
};
export default CustomInput;
