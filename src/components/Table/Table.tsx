import { ProductStatus, UserStatus } from '../../enum';
import { ProductTypeDto, UserTypeDto } from '../../interfaces';
import { moneyFormat } from '../../utils/MoneyFormat';
import Dropdown from '../Dropdown/Dropdown';
import BlackCoffee from '../../share/assets/img/blackcoffee.png';
import './Table.scss';
import ProductCart from '../../share/assets/vector/ProductCart.svg';

type Props = {
  header: Array<string | JSX.Element>;
  body: Array<ProductTypeDto | UserTypeDto>;
  startIndex?: number;
  isHaveDropdown: boolean;
};

const Table = (props: Props) => {
  const header = props.header;
  const body = props.body;

  return (
    <>
      <table className="table">
        <thead className="table-header">
          <tr>
            {header.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>

        {body.length > 0 && (
          <tbody>
            {body.map((object, index) => (
              <tr key={index} className="table-body__row">
                {props.startIndex && (
                  <td key={object.id} className="table-body__cell">
                    {props.startIndex + index}
                  </td>
                )}

                {Object.entries(object).map((obj, index) => {
                  const key = obj[0];
                  let value = obj[1];

                  if (typeof value === 'number') {
                    value = moneyFormat(value);
                  }

                  if (key === 'id') {
                    // eslint-disable-next-line array-callback-return
                    return;
                  } else if (key === 'images') {
                    return (
                      <td key={index}>
                        <img className="table-body__img" src={value || BlackCoffee} alt="Avatar Drink" />
                      </td>
                    );
                  }

                  return (
                    <td
                      key={index}
                      className={`table-body__cell ${
                        value === ProductStatus.OUT_OF_STOCK || value === UserStatus.IN_ACTIVE
                          ? 'table-body__cell--accent'
                          : ''
                      }`}
                    >
                      {value}
                    </td>
                  );
                })}

                {props.isHaveDropdown && (
                  <td className="table-body__cell grid justify-items-center">
                    <Dropdown selectedValue={object} />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {body.length === 0 && (
        <div className="table-body__empty">
          <div className="table-body__group">
            <img src={ProductCart} alt="Product Cart" />
            <p className="pt-2">No item is added yet.</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Table;
