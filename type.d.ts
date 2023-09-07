type ProductProps = {
  brand: string;
  category: string;
  description: string;
  image: string;
  isNew: boolean;
  oldPrice: string;
  price: string;
  title: string;
  _id: number;
  id: number;
}

type PriceProps = {
  amount: number;
}

type StoreProduct = {
  brand: string;
  category: string;
  description: string;
  image: string;
  isNew: boolean;
  oldPrice: string;
  price: string;
  title: string;
  _id: number;
  id: number;
  quantity: number;
}

type UserInfoProps = {
  image: null | string,
  name: null | string,
  email: null | string
}

type StateProps = {
  productData: [],
  favoriteData: [],
  userInfo: null | string,
  next: any
}