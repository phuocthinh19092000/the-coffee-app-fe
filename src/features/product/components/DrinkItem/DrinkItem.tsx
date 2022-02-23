import './DrinkItem.scss';
import { moneyPattern } from '../../../../utils/moneyRegex';
import { Product } from '../../../../interfaces';
import CoffeeImg from '../../../../share/assets/img/blackcoffee.png';
import React from 'react';

type Props = {
  item: Product;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

function DrinkItem(props: Props) {
  const moneyFormat = (price: number) => {
    return price.toString().replace(moneyPattern, ',');
  };
  return (
    <div className="drink-item" onClick={props.onClick}>
      <div className="drink-item__image">
        {/*// TODO: get image from API*/}
        {/* <img src={props.item.avatarUrl} alt={props.item.name} /> */}
        <img src={CoffeeImg} alt={props.item.name} />
      </div>
      <div>
        <div>
          <span className="drink-item__name">
            {props.item.name}
            <br />
          </span>
        </div>
        <div>
          <span className="drink-item__price">{moneyFormat(props.item.price)}đ</span>
        </div>
      </div>
    </div>
  );
}

export default DrinkItem;
