import { moneyPattern } from './regex';
export const moneyFormat = (price: number) => {
  return price.toString().replace(moneyPattern, ',');
};
