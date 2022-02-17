import React, { useEffect, useState } from 'react';
import './CustomSelect.scss';
import ExpandMore from '../../share/assets/vector/ExpandMore.svg';
import ExpandLess from '../../share/assets/vector/ExpandLess.svg';
import IconSelected from '../../share/assets/vector/IconSelected.svg';
import useComponentVisible from '../../utils/useComponentVisible';
type Props = {
  listOptions: string[] | number[];
  selectedValue?: string | number;
  placeholder?: string;
};

const CustomSelect = (props: Props) => {
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
  const [value, setValue] = useState<string | number>(props.selectedValue || '');
  const [colorSelect, setColorSelect] = useState(value ? 'text-black' : 'text-grey-1');
  const [showOutlineText, setShowOutlineText] = useState(false);

  const handleShowDropdown = () => {
    setIsComponentVisible(!isComponentVisible);
  };

  const handleOnSelectedOption = (item: string | number) => {
    setValue(item);
  };

  useEffect(() => {
    if (isComponentVisible || value) {
      setShowOutlineText(true);
      setColorSelect('text-black');
    } else {
      setShowOutlineText(false);
      setColorSelect('text-grey-1');
    }
  }, [isComponentVisible, value]);

  return (
    <div ref={ref}>
      <div className={`custom-select-container ${colorSelect}`} onClick={handleShowDropdown}>
        {showOutlineText && (
          <label
            htmlFor="inputSelect"
            className={`custom-select-container__label ${isComponentVisible ? 'text-accent-1' : 'text-grey-5'}`}
          >
            {props.placeholder}
          </label>
        )}
        <div className={`custom-select ${isComponentVisible ? 'border-accent-1' : 'border-grey-3'}`}>
          <div className="custom-select-header">
            <p className="custom-select-header__placeholder">{value || props.placeholder}</p>
            <img alt="icon" src={isComponentVisible ? ExpandLess : ExpandMore} />
          </div>
        </div>
        {isComponentVisible && (
          <div className="custom-select__dropdown ">
            {props.listOptions.map((item: string | number, index: number) => (
              <div className="custom-select-option" key={index} onClick={() => handleOnSelectedOption(item)}>
                <p className="custom-select-option__label">{item}</p>
                {item === value ? <img alt="iconSelected" src={IconSelected} /> : <></>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;
