import { useEffect, useState } from 'react';
import CategoryBar from '../../components/CategoryBar/CategoryBar';
import './Product.scss';
import Product from '../../../../interfaces/product';
import ListDrinkItem from '../../components/ListDrinkItem/ListDrinkItem';
import { useAppDispatch } from '../../../../storage/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../storage';
import { getAllCategory } from '../../actions/getCategoryData';
import Category from '../../../../interfaces/category';

const ProductPage = () => {
  const [listDrink, setListDrink] = useState<Product[]>([]);
  const [categoryId, setCategoryId] = useState('');
  const dispatch = useAppDispatch();
  const categories = useSelector((state: RootState) => state.category);

  useEffect(() => {
    async function fetchCategories() {
      const categoriesData = await dispatch(getAllCategory()).unwrap();
      const id = categoryId ? categoryId : categoriesData[0].id;
      handelSetCategory(id, categoriesData);
    }
    fetchCategories();
  }, [categoryId]);

  // const handelSetCategory = (id: string, categoriesData: any[]) => {
  //   setCategoryId(id);
  //   const categoryFind = categoriesData.find((item: any) => item.id === id);
  //   if (categoryFind?.products?.length > 0) {
  //     return setListDrink(categoryFind.products);
  //   }
  //   return setListDrink([]);
  // };
  function handelSetCategory(id: string, categoriesData: Category[]) {
    setCategoryId(id);
    const categoryFind = categoriesData.find((item: any) => item.id === id);
    // categoryFind?.products?.length > 0 ? setListDrink(categoryFind.products) : setListDrink([]);
    return setListDrink(categoryFind?.products!);
  }

  return (
    <div className="product">
      <div className="product-left">
        <CategoryBar
          categoryId={categoryId}
          onGetIdHandler={(categoryId: string) => setCategoryId(categoryId)}
          listCategory={categories.data}
        />
      </div>
      <div className="product-right">
        <ListDrinkItem listDrink={listDrink} />
      </div>
    </div>
  );
};

export default ProductPage;
