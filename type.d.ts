type ProductProps = {
  brand: string;
  category: string;
  description: string;
  image: string;
  isNew: boolean;
  oldPrice: number;
  price: number;
  title: string;
  _id: number;
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
  oldPrice: number;
  price: number;
  title: string;
  _id: number;
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