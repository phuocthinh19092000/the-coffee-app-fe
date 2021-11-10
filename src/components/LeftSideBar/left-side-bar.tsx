import React from 'react';
import '../LeftSideBar/left-side-bar.scss';

type Props = {
    titleItem: string;
}
const LeftSideBar = (props: Props) => {
    return <button className="item margin-top">
        {props.titleItem}
    </button>

};

export default LeftSideBar;