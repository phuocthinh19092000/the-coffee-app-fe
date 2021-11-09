import React from 'react';
import './Input.scss'


type Props = {
    src? : string ,
    placeholder? : string,
    className? : string,
}
const Input = (probs: Props) => {
    return <div id="input-container" className = {probs.className}>
                <input placeholder={probs.placeholder}/>
                <img src={probs.src} alt = {probs.src}  />
            </div>
}
export default Input
