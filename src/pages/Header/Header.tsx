import React, { useEffect, useState } from 'react';
import OTSVLogo from '../../share/assets/img/OTSVLogo.png';
import SearchVector from '../../share/assets/img/SearchVector.png';
import CoffeeImg from '../../share/assets/img/CoffeeImg.png';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Index';
import './Header.scss';
import SearchItem from '../../components/SearchItem/SearchItem';
import DrinkItems from '../../json/seed_products.json';
type Props = {
  id: number;
  name: string;
  price: number;
  type: string;
};
const Header = () => {
  const [value, setValue] = useState('');
  const [displaySearchList, setDisplaySearchList] = useState(false);
  const [searchList, setSearchList] = useState([{} as Props]);

  const handleSearchDrink: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);
  };
  useEffect(() => {
    if (value) {
      const newSearchList = DrinkItems.filter((drinkItem) =>
        drinkItem.name.toLowerCase().includes(value.toLowerCase()),
      );
      setDisplaySearchList(newSearchList.length ? true : false);
      setSearchList(newSearchList);
    } else {
      setDisplaySearchList(false);
    }
  }, [value]);

  return (
    <div className="header">
      <img src={OTSVLogo} alt={OTSVLogo} />
      <div className="search-container">
        <Input
          placeholder="Search drink"
          src={SearchVector}
          className="search-input"
          value={value}
          onChange={handleSearchDrink}
        />
        {displaySearchList && (
          <div className="search-list">
            {searchList.map((searchItem) => (
              <SearchItem
                key={searchItem.id}
                src={CoffeeImg}
                name={searchItem.name}
                price={searchItem.price.toString()}
              />
            ))}
          </div>
        )}
      </div>
      <Button className="primary login" titleButton="Login" />
    </div>
  );
};
export default Header;
