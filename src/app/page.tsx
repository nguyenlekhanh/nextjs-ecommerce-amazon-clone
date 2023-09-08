import HomeClientPage from '@/components/HomeClientPage';
import { GET_DATA } from '@/config/constants';
import getProductResults from '@/libs/getProductResults';

async function getData() {
  const res = await getProductResults();
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}
 

export default async function Home() {
  let data = null;

  if(GET_DATA && Number(GET_DATA)==1) {
    const productData: Promise<ProductProps[]> = getProductResults();
    //console.log(productData);
    data = await productData;
  }

  return (
    <main className="py-10 bg-gray-300">
      <HomeClientPage productData={data}/>
    </main>
  )
}
