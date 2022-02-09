import './Dropdown.scss';
import DropdownIcon from '../../share/assets/vector/Dropdown.svg';
import React, { useState } from 'react';
import EditIcon from '../../share/assets/vector/IconEdit.svg';
import DeleteIcon from '../../share/assets/vector/DeleteIcon.svg';

const Dropdown = () => {
    const [displayDropdown, setDisplayDropdown] = useState(false);
    const showDropdown = () => {
        setDisplayDropdown(!displayDropdown);
    };
    const handleEdit = () => {
        // TODO: handle edit item
    };
    const handleDelete = () => {
        // TODO: handle delete item
    };
    //TODO: handle click outside at parent component
    return (
        <div className='dropdown'>
            <div className='dropdown__icon' onClick={showDropdown}>
                <img src={DropdownIcon} alt='Dropdown' />
            </div>
            {displayDropdown && (
                <div className='dropdown__list'>
                    <div className='dropdown__list-group' onClick={handleEdit}>
                        <img src={EditIcon} alt='' className='mr-1.5' />
                        <p>Edit</p>
                    </div>
                    <div className='dropdown__list-group text-error' onClick={handleDelete}>
                        <img src={DeleteIcon} alt='' className='mr-1.5' />
                        <p>Delete</p>
                    </div>
                </div>
        )}
    </div>)
}
export default Dropdown;
