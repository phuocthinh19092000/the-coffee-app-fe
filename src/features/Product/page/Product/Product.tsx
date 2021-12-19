import { useEffect, useState } from 'react';
import CategoryBar from '../../components/CategoryBar/CategoryBar';
import './Product.scss';
import Category from '../../../../interfaces/category';
import categoryApi from '../../api/categoryAPI';
import Product from '../../../../interfaces/product';
import ListDrinkItem from '../../components/ListDrinkItem/ListDrinkItem';
import productApi from '../../api/productAPI';

type Props = {
  listDrink?: Product[];
  searchDrink?: Product[];
};

const ProductPage = (props: Props) => {
  const [categoryData, setCategoryData] = useState<Category[]>([]);
  const [listDrink, setListDrink] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchCategoryApi() {
      const response = await categoryApi.getAll();
      setCategoryData(response.data);
    }
    fetchCategoryApi();
  }, []);

  useEffect(() => {
    async function fetchProductApi() {
      const response = await productApi.getAllProduct();
      setListDrink(response.data);
    }
    fetchProductApi();
  }, []);

  const [categoryIdSelected, setCategoryIdSelected] = useState('');

  const handelSetCategory = (id: string) => {
    const categoryFind = categoryData.find((item) => item.id === id);
    setCategoryIdSelected(id);
    if (categoryFind !== undefined) {
      setListDrink(categoryFind.products);
    }
    // setCategoryIdSelected(id);
  };
  return (
    <div className="product">
      <div className="product-left">
        <CategoryBar
          onGetIdHandler={handelSetCategory}
          selectedCategoryId={categoryIdSelected}
          listCategory={categoryData}
        />
      </div>
      <div className="product-right">
        <ListDrinkItem listDrink={listDrink} />
      </div>
    </div>
  );
};

export default ProductPage;
