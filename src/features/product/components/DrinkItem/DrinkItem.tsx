import './DrinkItem.scss';
import { moneyPattern } from '../../../../utils/moneyRegex';
import { Product, ProductItem } from '../../../../interfaces';
import React from 'react';

type Props = {
  item: Product | ProductItem;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

function DrinkItem(props: Props) {
  const moneyFormat = (price: number) => {
    return price.toString().replace(moneyPattern, ',');
  };
  return (
    <div className="drink-item" onClick={props.onClick}>
      <img className="w-[160px]" src={props.item.images} alt={props.item.name} />
      <div>
        <div>
          <span className="drink-item__name mt-1.5 text-style-1440-h1">
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
