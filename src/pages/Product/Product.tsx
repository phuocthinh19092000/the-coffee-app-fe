import { useState } from 'react';
import ListDrinkItem from '../../components/ListDrinkItem/ListDrinkItem';
import CategoryBar from '../../components/CategoryBar/CategoryBar';
import DrinkData from '../../json/seed_products.json';
import '../Product/Product.scss';
const Product = () => {
  const [listDrink, setListDrink] = useState(DrinkData.filter((drink) => drink.id === 1));

  const [categoryIdSelected, setCategoryIdSelected] = useState(1);

  const handelSetCategory = (id: number) => {
    setListDrink(DrinkData.filter((item) => item.categoryID === id));
    setCategoryIdSelected(id);
  };
  return (
    <div className="product">
      <div className="product-left">
        <CategoryBar onGetIdHandler={handelSetCategory} selectedCategoryId={categoryIdSelected} />
      </div>
      <div className="product-right">
        <ListDrinkItem listDrink={listDrink} />
      </div>
    </div>
  );
};

export default Product;
