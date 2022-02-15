import React, { useState } from 'react';
import './CustomInput.scss';

interface Props {
  type?: string;
  placeholder?: string;
}
const CustomInput = (props: Props) => {
  const [outlinedText, setOutlinedText] = useState(false);
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
      <label htmlFor="inputText" className="outlined-text-input__label">
        {outlinedText && props.placeholder}
      </label>
      <input
        className="form-control"
        placeholder={props.placeholder}
        type={props.type || 'text'}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
    </div>
  );
};
export default CustomInput;
