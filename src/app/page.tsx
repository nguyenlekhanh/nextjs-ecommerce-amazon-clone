import HomeClientPage from '@/components/HomeClientPage';
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
  const productData: Promise<ProductProps[]> = getProductResults();
  // console.log(productData);
  const data = await productData;
  
  return (
    <main className="py-10 bg-gray-300">
      <HomeClientPage productData={data}/>
    </main>
  )
}
