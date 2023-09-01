import Banner from '@/components/Banner'
import Products from '@/components/Products'
import getProductResults from '@/libs/getProductResults'

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
  const productData: Promise<ProductResult> = getProductResults();

  const data = await productData;

  return (
    <main className="py-10 bg-gray-300">
      <div className="max-w-screen-2xl mx-auto">
        <Banner />
        <Products /> 
      </div>
    </main>
  )
}
