import React from 'react';
import { FieldError, useFormContext } from 'react-hook-form';
import './FormInput.css';

type Props = {
  src?: string;
  src2?: string;
  placeholder?: string;
  name: string;
  className?: string;
  type?: string | 'text';
  onClickFirstIcon?: React.MouseEventHandler<HTMLImageElement>;
  onClickSecondIcon?: React.MouseEventHandler<HTMLImageElement>;
  readOnly?: boolean | false;
  error?: FieldError;
};
const FormInput = (props: Props) => {
  const { register } = useFormContext();
  return (
    <div className={props.className}>
      <div className="block-form-input">
        <input
          placeholder={props.placeholder}
          type={props.type}
          readOnly={props.readOnly}
          autoComplete="off"
          {...register(props.name)}
        />
        <img src={props.src} className="icon-input" alt={props.src} onClick={props.onClickFirstIcon} />
      </div>
      {props.error && <p className="text-error ml-[20px] mt-[5px]">{props.error.message}</p>}
    </div>
  );
};
export default FormInput;
